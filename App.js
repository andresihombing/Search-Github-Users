import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Content, List, ListItem, Left, Thumbnail, Body, Text, View } from 'native-base';
import { LayoutAnimation, FlatList, RefreshControl } from 'react-native';
import ENV from "./env";
import GlobalStyle from "./src/style/globalStyle";

export default class SearchBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {                               
        isRefresh: false,
        data: [],
        username: 'a',
        getCount: 1,
        warning : ''
    }
  }

  componentDidMount(){
    this.getList()
  }

  //changes state username search
  async changeName(username){
    const {getCount} = this.state
    await this.setState({
      username: username,
      getCount: getCount+1,      
    })
    if(getCount <= 10){
      this.getList()      
    }else{
      this.setState({warning: 'sorry, wait one more minute to perform the search'})
      setTimeout(() => {
        this.setState({warning: '', getCount: 0})
      }, 60000);
    }    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  //get api github
  getList(){                
    this.setState({isRefresh: true})
    const {username} = this.state        
    let urlFetch = ENV.API_BASE_URL + `/search/users?q=${username}`
    fetch(urlFetch,
      {
          method: 'GET',                
      }).then((response) => response.json()).then(async (responseJson) => {          
          this.setState({data : responseJson.items, isRefresh: false})
      }).catch((error) => {                
          console.log(error)
          this.setState({ isRefresh: false });
      });
  }
  
  // view list data
  renderListCard(item){        
    return(
      <List>
        <ListItem avatar>
          <Left>
            <Thumbnail source={{ uri: `${item.avatar_url}` }} />
          </Left>
          <Body>
            <Text>{item.login}</Text>
          </Body>              
        </ListItem>
      </List>
    )
  }

  // view empty List
  ListEmptyComponent() {  
    const {isRefresh, username} = this.state  
    return (      
      <View>
        {
          !isRefresh &&
          <Text style={{textAlign: 'center', color: GlobalStyle.lightGray, fontSize: 20, fontWeight: 'bold'}}> {username} is Empty</Text>
        }
      </View>
    )
  }

  render() {    
    const {data, warning} = this.state
    return (
      <Container>
        <Header searchBar rounded>
          <Item style={{borderRadius: 15}}>
            <Icon name="ios-search" />
            <Input 
              placeholder="Search Github users"
              onChangeText={text => {
                this.changeName(text)
            }}/>            
            <Icon name="ios-people" />
          </Item>          
        </Header>        
        <Text style={{textAlign: 'center', fontSize: 12, color: 'red'}}>{warning}</Text>
        <Content>          
          <FlatList
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefresh}
                  onRefresh={this.refreshControl}
              />
            }
            data={data}
            renderItem={({ item, index }) => this.renderListCard(item, index)}
            ListEmptyComponent={() => this.ListEmptyComponent()}
            keyExtractor={item => item.id}
          />
        </Content>        
      </Container>
    );
  }
}