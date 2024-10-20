import './index.css'
import {Component} from 'react'

class Dishitem extends Component {
  state = {count: 0}

  increaseCount = () => {
    const {increaseCountnav} = this.props
    this.setState(prevState => ({count: (prevState.count += 1)}))
    increaseCountnav()
  }

  dicreaseCount = () => {
    const {count} = this.state
    const {dicreaseCountnav} = this.props
    if (count > 0) {
      this.setState(prevState => ({count: (prevState.count -= 1)}))
      dicreaseCountnav()
    }
  }

  render() {
    const {count} = this.state
    console.log(typeof count.toString())
    const {dishdetails} = this.props
    const {
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishImage,
      dishName,
      dishPrice,
      addonCat,
    } = dishdetails
    const custamization = addonCat.length !== 0 ? 'Custamization available' : ''
    const isavailablecolor = dishAvailability ? 'isavailablecolor' : ''
    const isavailablebg = dishAvailability ? 'isavailablebg' : ''
    return (
      <div className='ItemContainer'>
        <div className='DishContainer'>
          <div className={`Icon ${isavailablecolor}`}>
            <p className={`IconContent ${isavailablebg}`} />
          </div>
          <div className='DishDetails'>
            <h1 className='DishName'>{dishName}</h1>
            <p className='Dishprice'>{`${dishCurrency} ${dishPrice}`}</p>
            <p className='Disdescription'>{dishDescription}</p>
            {dishAvailability ? (
              <div className='ButtonContainer'>
                <button className='Countbutton' onClick={this.dicreaseCount}>
                  -
                </button>
                <p className='CountPara'>{count.toString()}</p>
                <button className='Countbutton' onClick={this.increaseCount}>
                  +
                </button>
              </div>
            ) : (
              <p className='Notavailable'>Not available</p>
            )}
            <p className='Customizationtext'>{custamization}</p>
          </div>
        </div>
        <p className='Calories'>{`${dishCalories} Calories`}</p>
        <img className='DishImage' src={dishImage} alt={dishName} />
      </div>
    )
  }
}

export default Dishitem
