import { TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

const Rating = ({rating}: {rating: number}) => {

  return (
    <div>
      {rating === 0 && (
        <div className="flex">
          <TbStar />
          <TbStar />
          <TbStar />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating > 0 && rating < 1 && (
        <div className="flex">
          <TbStarHalfFilled className="text-[#eca943]" />
          <TbStar />
          <TbStar />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating === 1 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStar />
          <TbStar />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating > 1 && rating < 2 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarHalfFilled className="text-[#eca943]" />
          <TbStar />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating === 2 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStar />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating > 2 && rating < 3 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarHalfFilled className="text-[#eca943]" />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating === 3 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStar />
          <TbStar />
        </div>
      )}
      {rating > 3 && rating < 4 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarHalfFilled className="text-[#eca943]" />
          <TbStar />
        </div>
      )}
      {rating === 4 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStar />
        </div>
      )}
      {rating > 4 && rating < 5 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarHalfFilled className="text-[#eca943]" />
        </div>
      )}
      {rating === 5 && (
        <div className="flex">
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
          <TbStarFilled className="text-[#eca943]" />
        </div>
      )}
    </div>
  )
}

export default Rating;