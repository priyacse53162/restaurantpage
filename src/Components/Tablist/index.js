import './index.css'

const Tabslist = props => {
  const {tabdetails, activetab, updatetab} = props
  const {menuCategory} = tabdetails

  const isActiveTablist = menuCategory === activetab ? 'activelist' : ''
  const isActiveTabName = menuCategory === activetab ? 'activeTabName' : ''
  const changetab = () => {
    updatetab(menuCategory)
  }
  return (
    <li className={`Tablist ${isActiveTablist}`} onClick={changetab}>
      <button className={`TabName ${isActiveTabName}`}>{menuCategory}</button>
    </li>
  )
}

export default Tabslist
