const Homepage = () => {
  return (
    <div className='flex gap-6'>
      <div className="hidden xl:block"></div> {/* the left, middle and the right containers, center appears at all times, right appears at large, left appears at xl according to the appropriate design of this project */}
      <div className="w-full"></div>
      <div className="hidden lg:block"></div>
    </div>
  )
}

export default Homepage