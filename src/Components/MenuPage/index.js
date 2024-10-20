import {Component} from 'react'
import './index.css'

import Tabslist from '../Tablist'
import Navbar from '../Navbar'
import Dishitem from '../Dishitem'

class MenuPage extends Component {
  state = {
    menuDetails: {},
    activetab: '',
    tabslist: {},
    tabsName: [],
    count: 0,
  }

  componentDidMount() {
    this.getmenudetails()
  }

  getmenudetails = async () => {
    const dishesApiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(dishesApiUrl)

    if (response.ok) {
      const data = await response.json()
      const convertaddons = item => ({
        dishAvailability: item.dish_Availability,
        dishType: item.dish_Type,
        dishCalories: item.dish_calories,
        dishCurrency: item.dish_currency,
        dishDescription: item.dish_description,
        dishId: item.dish_id,
        dishImage: item.dish_image,
        dishName: item.dish_name,
        dishPrice: item.dish_price,
        nexturl: item.nexturl,
      })
      const convertaddon = item => ({
        addonCategory: item.addon_category,
        addonCategoryId: item.addon_category_id,
        addonSelection: item.addon_selection,
        nexturl: item.nexturl,
        addons: item.addons.map(eachItem => convertaddons(eachItem)),
      })
      const convertcategory = item => ({
        dishAvailability: item.dish_Availability,
        dishType: item.dish_Type,
        dishCalories: item.dish_calories,
        dishCurrency: item.dish_currency,
        dishDescription: item.dish_description,
        dishId: item.dish_id,
        dishImage: item.dish_image,
        dishName: item.dish_name,
        dishPrice: item.dish_price,
        nexturl: item.nexturl,
        addonCat: item.addonCat.map(eachItem => convertaddon(eachItem)),
      })
      const convertMenu = item => ({
        menuCategory: item.menu_category,
        menuCategoryId: item.menu_category_id,
        menuCategoryImage: item.menu_category_image,
        nexturl: item.nexturl,
        categoryDishes: item.category_dishes.map(eachitem =>
          convertcategory(eachitem),
        ),
      })
      const covertedDetails = {
        branchName: data[0].branch_name,
        nexturl: data[0].nexturl,
        restaurantId: data[0].restaurant_id,
        restaurantImage: data[0].restaurant_image,
        restaurantName: data[0].restaurant_name,
        tableId: data[0].table_id,
        tableName: data[0].table_name,
      }
      const tableMenuList = data[0].table_menu_list.map(eachItem =>
        convertMenu(eachItem),
      )
      const tabsName = []
      for (let i = 0; i < tableMenuList.length; i++) {
        const tabName = {
          menuCategoryId: tableMenuList[i].menuCategoryId,
          menuCategory: tableMenuList[i].menuCategory,
        }
        tabsName.push(tabName)
      }
      const {menuCategory} = tabsName[0]
      this.setState({
        menuDetails: covertedDetails,
        tabslist: tableMenuList,
        tabsName,
        activetab: menuCategory,
      })
    }
  }

  increaseCountnav = () => {
    this.setState(prevState => ({count: (prevState.count += 1)}))
  }

  dicreaseCountnav = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: (prevState.count -= 1)}))
    }
  }

  updatetab = tabName => {
    this.setState({activetab: tabName})
  }

  getdishes = activetab => {
    const {tabslist} = this.state
    for (let i = 0; i < tabslist.length; i++) {
      if (tabslist[i].menuCategory === activetab) {
        return tabslist[i].categoryDishes
      }
    }
  }

  render() {
    const {menuDetails, tabslist, activetab, tabsName, count} = this.state
    const dishes = this.getdishes(activetab)
    console.log(tabslist)
    return (
      <div className="HomeContainer">
        <Navbar
          key={menuDetails.restaurantId}
          name={menuDetails.restaurantName}
          count={count}
        />
        <div className="TabsContainer">
          {tabsName.map(eachItem => (
            <Tabslist
              key={eachItem.menuCategoryId}
              tabdetails={eachItem}
              activetab={activetab}
              updatetab={this.updatetab}
            />
          ))}
        </div>
        {dishes !== undefined && (
          <div className="DishesContainer">
            {dishes.map(eachitem => (
              <Dishitem
                key={eachitem.dishId}
                dishdetails={eachitem}
                increaseCountnav={this.increaseCountnav}
                dicreaseCountnav={this.dicreaseCountnav}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}
export default MenuPage
