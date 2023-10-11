import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../../components/Stylesheets/PortfolioCategories.css'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

const AdminAllCategories = () => {
    const navigateTo = useNavigate();
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch('/api/admin/getprojects', {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProjectData(data);
                }

                if (res.status === 422) {
                    const error = new Error(res.error);
                    throw error;
                }
            } catch (err) {
                console.log(err);
                navigateTo('/admin/login');
            }
        };

        fetchdata();
    }, []);

    const buttonDashboard = () => {
        navigateTo("/admin");
    }
    const buttonNewProject = () => {
        navigateTo("/admin/project/new")
    }
    return (
        <>
            <Box sx={{ width: '100%', height: '100%' }}>
                <ImageList variant="masonry" cols={3} gap={8} className="CategoryBG">
                    <button className="btn btn-primary NewButton" onClick={buttonDashboard}><span className="arrowclass">&larr;</span> Dashboard</button>
                    <button className="btn btn-primary NewButton" onClick={buttonNewProject}>Add New Project</button>
                    {projectData && projectData.map((project) => {
                        const dynamicTo = `/admin/project/${project._id}`;
                        return (
                            <Link to={dynamicTo} state={{ fromHome: { project } }} key={project._id}>
                                <ImageListItem className="Category" key={project._id}>
                                    <img
                                        srcSet={`${project.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${project.images[0].url}?w=248&fit=crop&auto=format`}
                                        alt={project.title}
                                        loading="lazy"
                                        className="categoryImage"
                                    />
                                    <div className="Category__overlay Category__overlay--blur">
                                        <div className="Category__title">{project.title}</div>
                                    </div>
                                </ImageListItem>
                            </Link>
                        );
                    })}
                </ImageList>
            </Box>
        </>
    )
}

export default AdminAllCategories