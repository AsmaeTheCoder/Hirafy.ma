import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserArtisanMutation } from "../../services/authApi";
import { toast } from "react-toastify";
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { MailOutline, RoomOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { useListeAllCategoriesQuery, useListeCategoriesMutation } from "../../services/categorieApi";
import { useUploadFileMutation } from "../../services/cdnApi";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

const initialState = {
  fname : "",
  lname : "",
  telephone : "",
  adresse : "",
  ville : "",
  email : "",
  password : "",
  confirmPassword : "",
  category_id : "",
}

interface City {
  [key: string]: string;
}

const RegisterArtisan = () => {
  const { t, i18n } = useTranslation();
  const cities: City[] = t('villes', { returnObjects: true });

  // liste categorie
  const {data, error, isLoading, isSuccess, isFetching} = useListeAllCategoriesQuery();

  // registre
  const [formValue, setFormValue] = useState(initialState);

  const navigate = useNavigate();

  const [
    registerUserArtisan,
    {
      data: registerData,
      isSuccess: isRegisterSuccess, 
      isError: isRegisterError,
      error: registerError
    }
  ] = useRegisterUserArtisanMutation();

  const {fname, lname, telephone, adresse, ville, email, password, confirmPassword, category_id} = formValue;

  const handleChange = (e : any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]:value});
  };  

  const handleRegisterArtisan = async (e: any) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      return toast.error("Password don't match");
    }

    // await registerUser({fname, lname, telephone, adresse, ville, profil, email, password, role});

    if (fname && lname && telephone && adresse && ville && email && password && category_id) {
      await registerUserArtisan({fname, lname, telephone, adresse, ville, email, password, category_id, role:'artisan'});
    }
  }

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("l'utilisateur s'est enregistré avec succès");
      navigate("/");
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isRegisterError) {
      toast.error((registerError as any).data);
    }
  }, [isRegisterError]);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    // État pour suivre l'état de la case à cocher
    const [isChecked, setChecked] = useState(false);

    // Fonction appelée lors du changement d'état de la case à cocher
    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

  return (
    <>
      <Helmet>
        <title>
          {t('titre.Sinscrireentantquartisan')}
        </title>
      </Helmet>
      <section style={{ width: "100%", marginBottom: "40px" }}>

        <Typography variant="h5" sx={{ display: "flex", justifyContent: "center", mt: "30px", mb: "40px", fontWeight: "600", fontSize: "1.4rem"}}>
            {t('titre.titreRegistre')}
        </Typography>
        <form style={{ margin: "auto", padding: "15px", width: "650px", alignContent: "center" }} >
          <Stack spacing={4}>
            <TextField type='text' value={fname} id='fname' name='fname' placeholder={t('table.prenom')} onChange={handleChange} fullWidth size='medium' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <AccountCircleOutlinedIcon /> </InputAdornment> ), }} />

            <TextField type='text' value={lname} id='lname' name='lname' placeholder={t('table.nom')} onChange={handleChange} fullWidth size='medium' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <PersonOutlineOutlinedIcon /> </InputAdornment> ), }} />

            <TextField type='telephone' value={telephone} id='telephone' name='telephone' placeholder={t('table.telephone')} onChange={handleChange} fullWidth size='medium' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <LocalPhoneOutlinedIcon /> </InputAdornment> ), }} />

            <TextField type='email' value={email} id='email' name='email' placeholder={t('table.AdresseEmail')} onChange={handleChange} fullWidth size='medium' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <MailOutline /> </InputAdornment> ), }} />

            <FormControl fullWidth>
              <InputLabel id="select-label">Votre métier</InputLabel>
              <Select id="category_id" value={category_id} name="category_id" onChange={handleChange}   startAdornment={
              <InputAdornment position="start">
                <CategoryOutlinedIcon />
              </InputAdornment>
            } >
                <MenuItem disabled value="">
                  Votre métier
                </MenuItem>
                {data &&
                  data.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>{item.libelle}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="villes">Tout le Maroc</InputLabel>
              <Select label="villes" id='ville' name='ville' value={ville} onChange={handleChange} startAdornment={ <InputAdornment position="start"> <ApartmentOutlinedIcon /> </InputAdornment>} >
                <MenuItem value="">Tout le Maroc</MenuItem>
                {cities.map((city: City, index: number) => (
                  <MenuItem key={index} value={t(`villes.${index}.${Object.keys(city)[0]}`)}>{t(`villes.${index}.${Object.keys(city)[0]}`)}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField type='text' value={adresse} id='adresse' name='adresse' placeholder={t('table.Adresse')} onChange={handleChange} fullWidth size='medium' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <RoomOutlined /> </InputAdornment> ), }} />

            <TextField type={showPassword ? 'text' : 'password'} onChange={handleChange} name='password' placeholder={t('placeholder.password')} variant="outlined" fullWidth size='medium' InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />

            <TextField type={showPassword ? 'text' : 'password'} onChange={handleChange} name='confirmPassword' placeholder={t('placeholder.confirmpassword')} variant="outlined" fullWidth size='medium' InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />

            <FormControlLabel control={
            <Checkbox checked={isChecked} onChange={handleChangeCheckBox} name="conditionsUtilisation" color="primary" /> } label={t('label.Jaccepte')}/>
            
            <ColorButton onClick={(e) => handleRegisterArtisan(e)} variant="contained" sx={{ textDecoration: "none", textTransform: "none", borderRadius: "20px", fontWeight: "500", fontSize: "1.2rem" }} type="submit" fullWidth size='large' >
              {t('button.Sinscrire')}
            </ColorButton>

            <h2>
              {t('titre.Vousavezdejauncompte')} <Button variant='text' style={{ textDecoration: "none", color: "#E09540", textTransform: "none", fontWeight: "500", fontSize: "1.2rem" }} aria-haspopup="true" onClick={() => navigate("/login")} >{t('titre.login')}</Button>
            </h2>
          </Stack>
        </form>
      </section>
    </>
  )
}

export default RegisterArtisan