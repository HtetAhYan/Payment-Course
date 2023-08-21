import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function CardComp({data,setLoad}) {
  return (
    
   
    <Card sx={{ maxWidth: 200 }} onClick={()=>setLoad(true)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.eduadvisor.my/articles/2015/10/Choosing-Right-Degree-Feature-Header.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
         {data?.price}USD
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {data?.slug}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}