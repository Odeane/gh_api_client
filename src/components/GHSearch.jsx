import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Input, Card, Image, Icon } from 'semantic-ui-react'

const GHSearch = () => {

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('croney')

  useEffect(() => {
   getData()
  }, [query])

  const getData = async () => {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`)
    setUsers(response.data.items)
  }
  
  const handleChange = (e) => {
    setSearch(e.target.value)
   
  }

  const handleSubmit = e => {
    e.preventDefault()
     setQuery(search)
   }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="search" placeholder="Input GH username" value={search} onChange={handleChange}/>
        <Button type='submit' name="search">Search</Button>
      </form>
      {users.map(user =>
        <Card>
          <Card.Content>
            <Image alt='avatarpic' src={user.avatar_url} />
            <Card.Header>User name: {user.login}</Card.Header>
            <Card.Meta>
              <span className='id'>User id: {user.id}</span>
            </Card.Meta>

            <Card.Content extra>
              <p>Page: <a href={user.html_url} >
                <Icon name='user' />
                {user.html_url}
              </a>
              </p>
            </Card.Content>
            <br />
          </Card.Content>
        </Card>
        )}
    </>
  )
}

export default GHSearch
