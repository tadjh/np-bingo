import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import useTitle from '../../hooks/useTitle';
import Main from '../../components/Main';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export interface CreateProps {
  title?: string;
}

export default function Create({ title }: CreateProps) {
  useTitle(title);

  const [type, setType] = useState('default');
  const [state, setState] = useState({
    postage: false,
    corners: false,
    rovingl: false,
    visible: false,
  });

  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { postage, corners, rovingl, visible } = state;

  return (
    <React.Fragment>
      <Header>
        <Typography variant="h4" component="h1">
          Create
        </Typography>
      </Header>
      <Main className="justify-evenly">
        <FormControl component="fieldset">
          <FormLabel component="legend">Game Type</FormLabel>
          <RadioGroup
            aria-label="gametype"
            name="gametype1"
            value={type}
            onChange={handleRadio}
          >
            <FormControlLabel
              value="default"
              control={<Radio />}
              label="Bingo"
            />
            <FormControlLabel
              value="housey"
              disabled
              control={<Radio />}
              label="Housey-Housey"
            />
            <FormControlLabel
              value="death"
              disabled
              control={<Radio />}
              label="Death Bingo"
            />
            <FormControlLabel
              value="blackout"
              disabled
              control={<Radio />}
              label="Blackout Bingo"
            />
          </RadioGroup>
        </FormControl>
        {(type === 'default' || type === 'housey') && (
          <React.Fragment>
            <FormControl component="fieldset">
              <FormLabel component="legend">Special Rules</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={postage}
                      onChange={handleChange}
                      name="postage"
                    />
                  }
                  label="Postage Stamp"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={corners}
                      onChange={handleChange}
                      name="corners"
                    />
                  }
                  label="Corners"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rovingl}
                      onChange={handleChange}
                      name="rovingl"
                    />
                  }
                  label="Roving L"
                />
              </FormGroup>
              <FormHelperText>Optional</FormHelperText>
            </FormControl>
          </React.Fragment>
        )}
        <FormControl component="fieldset">
          <FormLabel component="legend">Visibility</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={visible}
                  onChange={handleChange}
                  name="visible"
                />
              }
              label="Public"
            />
          </FormGroup>
        </FormControl>
        <Button color="primary" variant="contained">
          Create Room
        </Button>
      </Main>
      <Footer>
        <Link className="nav-button" to="/">
          &larr; Back
        </Link>
      </Footer>
    </React.Fragment>
  );
}
