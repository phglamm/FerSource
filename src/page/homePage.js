import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const Root = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '20px',
});

const StyledCard = styled(Card)({
  width: '300px',
  margin: '10px',
});

const StyledMedia = styled(CardMedia)({
  height: 140,
});

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://6680067356c2c76b495ae640.mockapi.io/studentManagement')
      .then(response => {
        const sortedStudents = response.data.sort((a, b) => a.name.localeCompare(b.name));
        //dong 33 la tuy theo de keu xu ly nhu the nao
        //Code hien tai la hien thi ten theo bang chu cai
        setStudents(sortedStudents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Home Student
      </Typography>
      <Root>
        {students.map(student => (
          <div key={student.id}>
            <p>{student.id}</p>
            <p>{student.name}</p>
            <p>{student.dateofbirth}</p>
            <p>{student.gender}</p>
            <p>{student.class}</p>
           <img src={student.image}/>
          <Link to={`/detail/${student.id}`}> <Button variant='contained'>Detail</Button></Link>
          </div>

          // <StyledCard key={section.id}>
          //   <StyledMedia
          //     image={section.image}
          //     title={section.sectionName}
          //   />
          //   <CardContent>
          //     <Link to={`/detail/${section.id}`} style={{ textDecoration: 'none' }}>
          //       <Typography variant="h5" component="h2">
          //         {section.sectionName}
          //       </Typography>
          //     </Link>
          //     <Typography variant="body2" color="textSecondary" component="p">
          //       Duration: {section.duration}
          //     </Typography>
          //   </CardContent>
          // </StyledCard>
        ))}
      </Root>
    </div>
  );
};

export default Home;
