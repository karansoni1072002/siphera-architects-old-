import { createRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AdminCreateCategories = () => {
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
    // const [image, setImage] = useState()

    const PostData = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("image", fileInput.current.files[0])
        try {
            const res = await fetch('/api/admin/createcategory', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()
            console.log(data);
            if (data.status === 422 || !data) {
                window.alert(data.result);
            } else {
                window.alert(data.result);
                navigateTo(`/admin/category`)
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
                    <h1 className=''>Add New Category</h1>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id="floatingTitle" placeholder="title" />
                        <label htmlFor="floatingTitle">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='description' value={description} onChange={(e) => setDescription(e.target.value)} id="floatingDescription" placeholder="description" />
                        <label htmlFor="floatingDescription">Description</label>
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

export default AdminCreateCategories