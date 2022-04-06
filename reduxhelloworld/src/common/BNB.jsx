import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BNB = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
        <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
        <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
        <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default BNB;
