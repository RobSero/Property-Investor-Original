import React from 'react'
import { List, Avatar, Space } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import { getProperties } from '../../lib/api'
import SearchSection from '../common/SearchSection'
import { Link } from 'react-router-dom'

const listData = []
for (let i = 0; i < 8; i++) {
  listData.push({
    href: '#',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class PropertiesPage extends React.Component {
  state={
    propertyData: null,
    filterData: {
      region: null,
      price: null,
      outdoorSpace: null,
      finish: null,
      type: null
    },
    filteredProperties: null
  }

  async componentDidMount(){
    try {
      const res = await getProperties()
      console.log(res.data)
      
      this.setState({
        propertyData: res.data,
        filteredProperties: res.data
      })
    } catch (err){
      console.log(err)
    }
  }

handleChange = ({ target }) => {
  console.log(target)
  this.setState({
    filterData: {
      ...this.state.filterData,
      [target.name]: target.value
    }
  })
  setTimeout(()=>{
    this.filteredProperties()
  },1000)
}

filteredProperties = () => {
  const { propertyData } = this.state
  const { region, price, outdoorSpace, finish, type } = this.state.filterData
  let max,min
  switch (price) {
    case 1: max = 100000; min = 0; break
    case 2: max = 250000; min = 100000; break
    case 3: max = 500000; min = 250000; break
    case 4: max = 1500000; min = 500000; break
    default: max = 1500000; min = 0
  }
  console.log(`max: ${max} & min: ${min}`)
  console.log(propertyData[0])
  
  const filteredPropertyList = propertyData.filter(property => {
    return (property.region === region || region  === null) &&
    (property.outdoor_space === outdoorSpace || outdoorSpace === null) &&
    (property.finish === finish || finish === null) &&
    (property.prop_type === type || type === null) &&
    property.current_valuation < max && property.current_valuation > min 
  })
  this.setState({ filteredProperties: filteredPropertyList })
}


render(){
  if (!this.state.filteredProperties) {
    return <h1>LOADING</h1>
  }
    
  return (
    <div style={{ overflowY: 'scroll', height: '90vh', position: 'relative', width: '100%' }}>
      <SearchSection handleChange={this.handleChange} {...this.state.filterData} />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5
        }}
        dataSource={this.state.filteredProperties}
        style = {{ margin: '15px' }}
        renderItem={property => (
          <List.Item
            style = {{ backgroundColor: 'white', margin: '15px' }}
            // PROPERTY MAP KEY
            key={property.id}
            // PRICE, WATCH, RENT
            actions={[
              <IconText icon={StarOutlined} text={`£${property.current_valuation}`} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={`£${property.rental_value}pcm`} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={property.bedrooms} key="list-vertical-message" />
            ]}
            // MAIN PHOTO HERE
            extra={
              <img
                width={272}
                alt="logo"
                src={property.image_main}
              />
            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={property.avatar} />}
              // PROPERTY TITLE
              title={<Link to={`property/${property.id}`}><p>{property.title}</p></Link>}
              // PROPERTY DESCRIPTION
              description={property.address}
            />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </List.Item>
        )}
      />
    </div>
      
  )
}
}

export default PropertiesPage






