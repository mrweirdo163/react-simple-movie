import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import useSWR from "swr";
import { fetcher } from "../../config";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const img_path = "https://image.tmdb.org/t/p/original";
  const { data } = useSWR(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=c0f1c0571c03dffda8ff23bc896915b8",
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="mb-20 banner page-container">
      <Swiper
        grabCursor={"true"}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {movies &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} img_path={img_path}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item, img_path }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[500px] rounded-lg">
      <div className="absolute inset-0 bg-black bg-opacity-30 bg-gradient-to-t overlay"></div>
      <img
        src={`${img_path + item.poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{item.original_title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="p-2 text-[0.65em] border-2 border-gray-500 rounded-md">
            Action
          </span>
          <span className="p-2 text-[0.65em] border-2 border-gray-500 rounded-md">
            Adventure
          </span>
          <span className="p-2 text-[0.65em] border-2 border-gray-500 rounded-md">
            Drama
          </span>
        </div>
        <button
          className="flex items-center py-2 rounded-lg px-7 bg-primary gap-x-2"
          onClick={() => navigate(`/movies/${item.id}`)}
        >
          Watch
          <i className="text-2xl bx bx-play-circle"></i>
        </button>
      </div>
    </div>
  );
};
export default Banner;
