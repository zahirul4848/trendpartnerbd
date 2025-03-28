import CategoryCarousel from "@/components/home/category-carousel";
import CoverCarousel from "@/components/home/cover-carousel";
import ProductCarousel from "@/components/home/product-carousel";


export default function Home() {

  return (
    <main>
      <CoverCarousel/>
      <div className="mx-4 md:mx-16 my-4">
        <CategoryCarousel/>
      </div>
      <div className="mx-4 md:mx-16 my-4">
        <ProductCarousel/>
      </div>
    </main>
  );
}