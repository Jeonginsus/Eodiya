import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from "axios";

const theme = createTheme();

export default function SignUp(props) {
  const [gender, setGender] = React.useState("");
  const [birthday, setBirthday] = React.useState(null);

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = {
      email:formdata.get("email"),
      password:formdata.get("password"),
      passwordConfirmation:formdata.get("passwordConfirmation"),
      birthday:birthday,
      gender:formdata.get("gender"),
      username:formdata.get("Name")
    }
    console.log(data);
    axios
      .post("/accounts/signup/", data, {
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
      })
      .then((response) => {
        console.log(response)
        handleCloseModal();
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response);
      });
  const handleCloseModal = () => {
    props.closemodal();
  };
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ????????????
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="?????????"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="?????????"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="????????????"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="??????????????????"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Basic example"
                    value={birthday}
                    name ="birth"
                    onChange={(newValue) => {
                      setBirthday(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                ??????
                <Radio
                  checked={gender === 'male'}
                  onChange={handleChange}
                  value="male"
                  name="gender"
                  inputProps={{ 'aria-label': 'A' }}
                />
                ??????
                <Radio
                  checked={gender === 'female'}
                  onChange={handleChange}
                  value="female"
                  name="gender"
                  inputProps={{ 'aria-label': 'B' }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ????????????
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
