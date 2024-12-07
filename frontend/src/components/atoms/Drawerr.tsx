import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { PeopleOutline } from '@mui/icons-material';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Avatar, ListItemAvatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../../features/authSlice1';
import { useLogOutMutation } from '../../services/authApi';
import { useTranslation } from 'react-i18next';

const Drawerr = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logOut] = useLogOutMutation();

  const handleLogout = async () => {
    dispatch(setUser(null));
    await logOut().unwrap();
    toast.success("User Logout Successfully");
    navigate("/login");
  };

  const user = useAppSelector((state: RootState) => state.auth.user);  
  

  return (
    <>
      {
        user ?
          <Typography component="div" sx={{ mr: "50px", mt: "-14px", backgroundColor: "#F5F5F5", width: "270px" }}>
          <List>

            <ListItem sx={{ display: "flex" }}>
              <ListItemAvatar sx={{ mx: 'auto', mt: "40px" }} >
                <Avatar alt={`${user?.lname} ${user?.fname}`} src={user?.profil}  />
              </ListItemAvatar>
            </ListItem>

            <ListItem>
              <ListItemText primary={`${user?.lname} ${user?.fname}`}  sx={{ textAlign: 'center' }} />
            </ListItem>

            <Divider />

            {user?.gates?.includes("liste clients") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeClients") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <PeopleOutline sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Clients')} />
              </ListItemButton>
            </ListItem>}

            {user?.gates?.includes("liste artisans") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeArtisans") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <EngineeringOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Artisans')} />
              </ListItemButton>
            </ListItem>}

            {user?.gates?.includes("liste supporteurs") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeSupporteurAdmin") }} sx={{ "&:hover": {color: "#E09540"} }} >
                <ListItemIcon>
                  <GroupsOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Supporteurs')} />
              </ListItemButton>
            </ListItem>}

            {user?.gates?.includes("liste contacts") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeContactUs") }} sx={{ "&:hover": {color: "#E09540"} }} >
                <ListItemIcon>
                  <ContactsOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Contacts')} />
              </ListItemButton>
            </ListItem>}

            {user?.gates?.includes("liste categories") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeCategories") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <CategoryOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Categorie')} />
              </ListItemButton>
            </ListItem>}

            {user?.gates?.includes("liste reclamation") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeReclamations") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <SupportOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Réclamation')} />
              </ListItemButton>
            </ListItem>}

            {user?.role=="admin" && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/listeReviews") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <StarBorderPurple500OutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('table.Avis')} />
              </ListItemButton>
            </ListItem>}

            {user?.gates?.includes("gerer profil") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/updateProfil") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <FolderSharedOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.updateProfil')} />
              </ListItemButton>
            </ListItem>}

            {user?.role=="artisan" && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/gallery") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <CollectionsOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Galories')} />
              </ListItemButton>
            </ListItem>}

            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/resetPassword") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <LockOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('placeholder.password')} />
              </ListItemButton>
            </ListItem>

            {user?.gates?.includes("envoyer reclamation") && <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/addReclamation") }} sx={{ "&:hover": {color: "#E09540"} }}>
                <ListItemIcon>
                  <SupportOutlinedIcon sx={{ color: "black", "&:hover": {color: "#E09540"} }} />
                </ListItemIcon>
                <ListItemText primary={t('titre.Reclamez')} />
              </ListItemButton>
            </ListItem>}

            <Divider sx={{ width: "215px", margin: "auto" }} />

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLogout()}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={t('titre.Déconnexion')} sx={{ color: "gray" }} />
              </ListItemButton>
            </ListItem>

          </List>
          </Typography>
      :
        <></>  
      }
    </>
  )
}

export default Drawerr