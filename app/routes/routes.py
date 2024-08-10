from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .. import models, schemas, crud, auth, database


routes = APIRouter()

#Login route
@routes.post("/token", response_model=schemas.Token,tags=["Login"])
def login_for_access_token(db: Session = Depends(database.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer","role":user.role}


#Registration route
@routes.post("/register", response_model=schemas.UserOut,tags=["Register"])
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


#Logged-In User's Info fetch
@routes.get("/users/me", response_model=schemas.UserOut,tags=["User Info"])
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


#Logged-In User's Info Update
@routes.put("/users/me", response_model=schemas.UserOut,tags=["User Update"])
def update_user_me(user_update: schemas.UserUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.update_user(db=db, user=current_user, user_update=user_update)


#Logged-In User(Admin) -> Info fetch (of All Users)
@routes.get("/admin/users", response_model=list[schemas.UserOut],tags=["Admin Actions"])
def get_all_users(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    return crud.get_users(db=db)


#Logged-In User(Admin) -> Info Update (of All Users)
@routes.put("/admin/users/{user_id}", response_model=schemas.UserOut,tags=["Admin Actions"])
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    user = crud.get_user(db=db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user(db=db, user=user, user_update=user_update)

#User Delete by Admin
@routes.delete("/admin/users/{user_id}", response_model=dict,tags=["Admin Actions"])
def delete_user(user_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    success = crud.delete_user(db=db, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "User deleted successfully"}
