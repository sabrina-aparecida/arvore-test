import './header.css';

const NavBar = ({ busca, setBusca }) => {

  const user = 'Sabrina'
  return (
    <div className='app-header'>

      <div>
        <img className='logo' src='https://assets-global.website-files.com/61155c49f7b752684a9f0584/61201e989ae795462db99155_logo-arvore.svg' />
      </div>

      <div className='div-input'>
        <input
          type='text'
          name='fname'
          className='input'
          placeholder='Search'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className='user-info'>
        <div className='photo' />
        <div className='user-name'>
          <p>{user}</p>
        </div>
        <div className='stroke' />
      </div>

    </div >
  )
};

export default NavBar;