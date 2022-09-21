import { Avatar, Typography } from "@mui/material";

const RouteGradeAvatar = ({ size, grade }) => {
  const getColor = (grade) => {
    if (!grade) return "grey"; // Broken

    const asNumber = parseInt(grade[0]);
    if (isNaN(grade[0])) return "grey"; //Broken

    if (asNumber <= 4) return "yellow";
    if (asNumber === 5) return "lightGreen";
    if (grade.startsWith("6A")) return "orange";
    if (grade.startsWith("6B")) return "blue";
    if (grade.startsWith("6C")) return "red";
    if (grade.startsWith("7A")) return "purple";
    if (grade.startsWith("7B")) return "pink";
    if (grade.startsWith("7C")) return "black";
    else return "grey";
  };

  return (
    <Avatar
      sx={{
        width: { size },
        height: { size },
        bgcolor: getColor(grade),
        borderStyle: "solid",
        borderColor: "secondary.main",
      }}
    >
      <Typography color="secondary.main">{grade}</Typography>
    </Avatar>
  );
};

export default RouteGradeAvatar;
