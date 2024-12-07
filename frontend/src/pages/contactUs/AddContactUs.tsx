import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddContactUsMutation } from '../../services/contactUsApi';
import { toast } from 'react-toastify';
import { Button, Paper, TextField, TextareaAutosize, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';

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
    email : "",
    telephone : "",
    description : "",
}

const AddContactUs = () => {
    const [formValue, setFormValue] = useState(initialState);

    const navigate = useNavigate();

    const [
        AddContactUs,
        {
            data,
            isSuccess,
            isError,
            error
        }
    ] = useAddContactUsMutation();

    const {fname, lname, email, telephone, description} = formValue;

    const handleChange = (e : any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (fname && lname && email && telephone && description) {
        await AddContactUs({fname, lname, email, telephone, description});
      }
    }

    useEffect(() => {
        if (isSuccess) {
          toast.success("l'utilisateur s'est enregistré avec succès");
          navigate("/");
        }
      }, [isSuccess]);

    useEffect(() => {
        if (isError) {
          toast.error((error as any).data);
        }
    }, [isError]);

  return (
    <>
      <Helmet>
        <title>
          Contactez-nous
        </title>
      </Helmet>
      <section style={{ width: "96%", marginBottom: "40px", marginLeft: "50px" }}>
        <div style={{ display: "flex", marginRight: "20px"}}>
          <Typography component="div" sx={{ mt: "100px" }}>
            <Typography variant='h4'>Contactez-nous</Typography>
            <br/><br/><br/>
            <div style={{ marginLeft: "20px" }}>
              Besoin de nous contacter ? Soit remplissez <br/>
              le formulaire avec votre demande.
            </div>
          </Typography>
          <Paper elevation={3} sx={{ borderRadius: "20px", padding: "40px", width: "600px", marginLeft: "160px", mr: "-30px" }}>
            <div>
              <form method="post" onSubmit={handleSubmit}>
                <Typography component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography component="div" sx={{ width: "280px" }} >
                  <Typography variant="h6" component="label">
                    Prénom
                  </Typography>
                  <br/><br/>
                  <TextField type='text' id='fname' name='fname' onChange={handleChange} fullWidth size='small' variant="outlined" />
                  <br/><br/>
                  </Typography>

                  <Typography component="div" sx={{ width: "280px" }} >
                    <Typography variant="h6" component="label">
                      Nom
                    </Typography>
                    <br/><br/>
                    <TextField type='text' id='lname' name='lname' onChange={handleChange} fullWidth size='small' variant="outlined" />
                    <br/><br/>
                  </Typography>
              
                </Typography>

                <Typography variant="h6" component="label">
                  Email
                </Typography>
                <br/><br/>
                <TextField type='email' id='email' name='email' onChange={handleChange} fullWidth size='small' variant="outlined" />
                <br/><br/>

                <Typography variant="h6" component="label">
                  Téléphone
                </Typography>
                <br/><br/>
                <TextField type='tel' id='telephone' name='telephone' onChange={handleChange} fullWidth size='small' variant="outlined" />
                <br/><br/>

                <Typography variant="h6" component="label">
                  Déscription
                </Typography>
                <br/><br/>
                <textarea name='description' cols={77} rows={6} style={{ border: "1px solid lightgrey", borderRadius: "6px", padding: "8px", marginLeft: "auto", marginRight: "auto" }} onChange={handleChange}  />
                <br/><br/>

                <div style={{ display: "flex", justifyContent: "flex-end" }} >
                  <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >Contactez-Nous</ColorButton>
                </div>
              </form>
            </div>
          </Paper>
        </div>
      </section>
    </>
  )
}

export default AddContactUs;