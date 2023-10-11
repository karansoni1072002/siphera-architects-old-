import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import '../../components/Stylesheets/singleProject.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from "@mui/material";


const AdminProjectShow = () => {
    const location = useLocation();
    const [data, setData] = useState({}); // Initialize state with a default value, in this case, null
    const navigateTo = useNavigate();

    useEffect(() => {
        const authorize = async () => {
            try {
                const res = await fetch('/api/admin/authorization', {
                    method: 'GET',
                })
                if (res.status !== 200) {
                    navigateTo('/admin/login');
                }
            } catch (error) {
                console.log(error);
                navigateTo('/admin/login');
            }
        }
        authorize();
    }, [])

    useEffect(() => {
        if (location.state && location.state.fromHome) {
            const { fromHome } = location.state;
            const project = fromHome.project;
            console.log(project);
            setData(project);

        } else {
            console.log("No valid data found in location.state.fromHome");
        }
    }, []);
    const imageUrl = data && data.images && data.images.length > 0 ? data.images[0].url : null;

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Fahkwang'
            ].join(','),
        },
    })

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/admin/project/${data._id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectId: data._id })
            })
            const response = await res.json();
            console.log(response);
            if (res.status === 201) {
                window.alert(response.result);
                navigateTo('/admin/project')
            } else if (res.status === 422) {
                window.alert(response.error);
            }
        } catch (error) {
            window.alert(error);
        }

    }

    return (
        <div className="MainDiv">
            <Card className="ProjectShowDiv" sx={{ backgroundColor: '#343a40', color: '#ffffff' }}>
                <div className="ImageProjectClass">
                    <div className="InsideImageProjectClass">
                        <CardMedia
                            component="img"
                            alt="category image"
                            image={imageUrl}
                            className="ProjectImage"
                        />
                    </div>
                </div>
                <div className="ProjectTextClass">
                    <div id="textclass2" className="InsideTextProjectClass">
                        <ThemeProvider theme={theme}>
                            <CardContent >
                                <Typography gutterBottom variant="h3" component="div">
                                    <span className="textSpan">{data.title}</span>
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Description:</span> {data.description}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Location:</span> {data.location}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Project Status:</span> {data.projectStatus}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Site Area:</span> {data.siteArea}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Project Area:</span> {data.projectArea}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Project Type:</span> {data.projectType}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Project Team:</span> {data.projectTeam}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Collaborators:</span> {data.collaborators}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    <span className="textSpan">Photography Name:</span> {data.photographyName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <button className="btn myButton" onClick={handleDeleteClick}>Delete Category</button>
                            </CardActions>
                        </ThemeProvider>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AdminProjectShow