import { useEffect } from "react";
import images from "../../assets/images"
import '../../components/Stylesheets/Dashboard.css'
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
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

    const buttonAllProjects = () => {
        navigateTo('/admin/project');
    }
    const buttonAllCategories = () => {
        navigateTo('/admin/category');
    }
    const buttonAddProject = () => {
        navigateTo('/admin/project/new');
    }
    const buttonAddCategory = () => {
        navigateTo('/admin/category/new');
    }
    const buttonLogout = async () => {
        try {
            const res = await fetch('/api/admin/logout', {
                method: 'GET'
            })
            const response = await res.json();
            if (res.status === 200) {
                window.alert(response.result);
                navigateTo('/');
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="DashboardMainDiv">
                <div className="DashboardLogoDiv">
                    <img src={images.SipheraLogo} alt="" className="DashboardLogo" />
                </div>
                <div className="DashboardButtons">
                    <div className="insideButtonClass">
                        <button className="btn btn-primary MyButton" onClick={buttonAllProjects}>All Projects</button>
                        <button className="btn btn-primary MyButton" onClick={buttonAllCategories}>All Categories</button>
                    </div>
                    <div className="insideButtonClass">
                        <button className="btn btn-primary MyButton" onClick={buttonAddProject}>Add Project</button>
                        <button className="btn btn-primary MyButton" onClick={buttonAddCategory}>Add Category</button>
                    </div>
                    <div className="insideButtonClass">
                        <button className="btn btn-primary MyButton" onClick={buttonLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard