import images from "../../assets/images"
import '../../components/Stylesheets/PortfolioCategories.css'

const PortfolioCategoriesPage = () => {
  return (
    <div className="CategoryBG">
      <div className="Category">
        <img src={images.Bungalow} className="categoryImage" alt="" />
        <div className="Category__overlay Category__overlay--blur">
          <div className="Category__title">Single Residential</div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCategoriesPage