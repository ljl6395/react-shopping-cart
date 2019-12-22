import React from 'react'
import styles from './FloatCart.css'
import { Drawer, Icon, Button } from 'antd';
import FloatCartList from '../components/FloatCardList'
import { connect } from 'dva'

@connect(({ indexPage }) => ({
  cartData: indexPage.cartData,
  count: indexPage.count,
  subTotal: indexPage.subTotal
}))
class FloatCart extends React.Component {

  state = { 
    visible: false, 
    storage: window.localStorage
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });

    // console.log('ffffffffffffffffffff', this.props.cartData)

  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleCheckout = () => {
    alert(`Checkout - Subtotal: $ ${this.props.subTotal.toFixed(2)}`)
  }

  render() {

    const {cartData, count, subTotal, dispatch} = this.props
    const {storage} = this.state 
    
    // console.log('cartData', cartData)
    // console.log('storage',storage.data)
    // 设置 localStorage
    if(cartData.length === 0) {
      console.log('success')
      dispatch({
        type: 'indexPage/setStorage',
      })  
    }else {
      console.log('failed')
      let data = JSON.stringify(cartData)
      let _count = count
      let _subTotal = JSON.stringify(subTotal)
      storage.setItem("data", data)
      storage.setItem("count", _count)
      storage.setItem("subTotal", _subTotal)
    }

    const icon = (
      <div style={{ display: 'flex', width: '110px', margin: '0 auto' }}>
        <div style={{ width: '60px', height: '60px', textAlign: 'center', position: 'relative' }}>
          <Icon type="shopping-cart" style={{ color: 'white', fontSize: '40px', lineHeight: '60px' }} />
          <div style={{ position: 'absolute', top: 32, left: 33, color: 'black', fontSize: '5px', height: '18px', width: '18px', borderRadius: '9px', background: 'darkgoldenrod', lineHeight: '18px' }}>
            {count}
          </div>
        </div>
        <span style={{ color: 'white', fontSize: '24px', lineHeight: '55px' }}>
          Cart
        </span>
      </div>
    )
    const bottom = (
      <div style={{ borderTop: '1px solid white', height: '160px', width: '450px', bottom: 0, position: 'fixed', background: '#333', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
          <p style={{ margin: 0 }}>SUBTOTAL</p>
          <div style={{}}>
            <p style={{ margin: 0, color: 'darkgoldenrod', fontSize: '24px' }}>${subTotal.toFixed(2)}</p>
            <p style={{ margin: 0 }}>OR UP TO 3 x $ {(subTotal/3).toFixed(2)}</p>
          </div>
        </div>
        <Button
          block
          style={{ borderRadius: 0, background: '#222', color: 'white', fontSize: '20px', border: 'none', height: '40px', lineHeight: '40px', marginTop: '20px' }}
          onClick={this.handleCheckout}
        >
          CHECKOUT
        </Button>
      </div>
    )
    const empty = (
      <div style={{ height: '160px' }}>

      </div>
    )
    
    
    

    return (
      <div>
        <div type="primary" onClick={this.showDrawer} className={styles.open}>
          <Icon type="shopping-cart" className={styles.open_icon} />
          <div className={styles.open_count}>{count}</div>
        </div>
        <Drawer
          title={icon}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={'450px'}
          drawerStyle={{ position: 'relative', background: '#333', }}
          headerStyle={{ background: '#333', padding: '20px' }}
          bodyStyle={{ background: '#333', padding: 0 }}
        >
          {cartData.map(item => (<FloatCartList data={item} key={item.id} />))}

          {empty}
          {bottom}
        </Drawer>
      </div>
    );
  }
}

export default FloatCart