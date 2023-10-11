import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import '../../components/Stylesheets/singleCategory.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from "@mui/material";


const AdminCategoryShow = () => {
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
            const category = fromHome.category;
            setData(category);

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
            const res = await fetch(`/api/admin/category/${data._id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId: data._id })
            })
            const response = await res.json();
            console.log(response);
            // const response = await res.json();
            if (res.status === 201) {
                window.alert(res.result);
                navigateTo('/admin/category')
            } else if (response.status === 422) {
                window.alert(response.error);
            }
        } catch (error) {
            window.alert(error);
        }

    }

    return (
        <div className="MainDiv">
            <Card className="CategoryShowDiv" sx={{ backgroundColor: '#343a40', color: '#ffffff' }}>
                <div className="ImageClass">
                    <div className="InsideImageClass">
                        <CardMedia
                            component="img"
                            alt="category image"
                            image={imageUrl}
                            className="Image"
                        />
                    </div>
                </div>
                <div className="TextClass">
                    <div id="textclass2" className="InsideTextClass">
                        <ThemeProvider theme={theme}>
                            <CardContent >
                                <Typography gutterBottom variant="h3" component="div">
                                    {data.title}
                                </Typography>
                                <Typography variant="body2" color="#ffffff">
                                    {data.description}
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

export default AdminCategoryShow