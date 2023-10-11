import { createRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AdminCreateProjects = () => {
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

    const fileInput = createRef();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [projectStatus, setProjectStatus] = useState("")
    const [siteArea, setSiteArea] = useState("")
    const [projectArea, setProjectArea] = useState("")
    const [projectType, setProjectType] = useState("")
    const [projectTeam, setProjectTeam] = useState("")
    const [collaborators, setCollaborators] = useState("")
    const [photographyName, setPhotographyName] = useState("")
    // const [image, setImage] = useState()

    const PostData = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("location", location)
        formData.append("projectStatus", projectStatus)
        formData.append("siteArea", siteArea)
        formData.append("projectArea", projectArea)
        formData.append("projectType", projectType)
        formData.append("projectTeam", projectTeam)
        formData.append("collaborators", collaborators)
        formData.append("photographyName", photographyName)
        formData.append("image", fileInput.current.files[0])
        try {
            const res = await fetch('/api/admin/createproject', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()
            console.log(data);
            if (data.status === 422 || !data) {
                window.alert(data.result);
            } else {
                window.alert(data.result);
                navigateTo(`/admin/project`)
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="form-group">

                <form method='POST' className='container'>
                    <h1 className=''>Add New Project</h1>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id="floatingTitle" placeholder="title" />
                        <label htmlFor="floatingTitle">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='description' value={description} onChange={(e) => setDescription(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='location' value={location} onChange={(e) => setLocation(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Location</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='projectStatus' value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Project Status</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='siteArea' value={siteArea} onChange={(e) => setSiteArea(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Site Area</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='projectArea' value={projectArea} onChange={(e) => setProjectArea(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Project Area</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='projectType' value={projectType} onChange={(e) => setProjectType(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Project Type</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='projectTeam' value={projectTeam} onChange={(e) => setProjectTeam(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Project Team</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='collaborators' value={collaborators} onChange={(e) => setCollaborators(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Collaborators</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='photographyName' value={photographyName} onChange={(e) => setPhotographyName(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Photography Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" ref={fileInput} type="file" id="image" accept="image/*" />
                        <label htmlFor="image" className="form-label">Image</label>
                    </div>
                    <button type="submit" onClick={PostData} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AdminCreateProjects