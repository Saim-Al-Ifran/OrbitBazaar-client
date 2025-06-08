
import { Helmet } from "react-helmet";
import Banner from "./Sections/Banner/Banner";
import FeaturedProducts from "./Sections/FeaturedProduct/FeaturedProducts";
import NewArrivals from "./Sections/NewArrivals/NewArrivals";
import ShopBenefits from "./WhyChooseUs/ShopBenefits";

const Home = () => {
  return (
       <>
        <Helmet>
          <title>OrbitBazaar - Your One-Stop Online Shop</title>
        </Helmet>
        <Banner/>
        <FeaturedProducts/>
        <NewArrivals/>
        <ShopBenefits/>
       </>
              
  
  )
}

export default Home