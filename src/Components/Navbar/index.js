import './index.css'
import {IoCartOutline} from 'react-icons/io5'

const Navbar = props => {
  const {name, count} = props
  return (
    <>
      <div className="Container">
        <h1 className="MainHeading">{name}</h1>
        <div className="Cart">
          <p className="Myorder">My orders</p>
          <div className="Carticon">
            <span className="CartIcon">
              <IoCartOutline size={30} />
            </span>
            <p className="Count">{count}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
