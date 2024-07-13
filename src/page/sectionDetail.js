import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: "20px auto",
});

const StyledMedia = styled(CardMedia)({
  height: 140,
});

const Detail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://6680067356c2c76b495ae640.mockapi.io/studentManagement/${id}`
      )
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    // <div>
    //   <p>{student.name}</p>
    //   <p>{student.dateofbirth}</p>
    //   <p>{student.gender}</p>
    //   <p>{student.class}</p>
    //   <img src={student.image}/>
    //   <p>{student.feedback}</p>
    // </div>
    <StyledCard>
      <StyledMedia image={student.image} title={student.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {student.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {student.dateofbirth}{" "}
        </Typography>
        {student.gender ? (
          <Typography variant="body2" color="textSecondary" component="p">
            Nam
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            Nữ
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" component="p">
          {student.class}{" "}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {student.feedback}{" "}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Detail;
