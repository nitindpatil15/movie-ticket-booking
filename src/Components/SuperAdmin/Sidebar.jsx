import React from 'react'
import './Sidebar.css';
import logoP from '../Assets/Movie-Booking-001.png'



const Sidebar = () => {
  return (
    <><div class="sidebar">
    <img src={logoP} alt="logo" id="logo"/>
    <a href="#AddMovie" id="active"><i class="fa fa-fw fa-plus"></i> Add Theater</a>
    <a href="#services"><i class="fa fa-fw fa-wrench"></i>Manage Movies</a>
    <a href="#contact"><i class="fa fa-fw fa-picture-o"></i>Manage Theater</a>
    <a href="#clients"><i class="fa fa-fw fa-user-plus"></i>Create Admin</a>
    <a href="#clients"><i class="fa fa-fw fa-calendar"></i>Manage Show Time</a>
    <a href="#services"><i class="fa fa-fw fa-wrench"></i>User Reservations</a>
    <a href="#services"><i class="fa fa-fw fa-wrench"></i>User Managements</a>
    <a href="#services"><i class="fa fa-fw fa-wrench"></i>Admin Managements</a>
    <a href="#services"><i class="fa fa-fw fa-play"></i>Assign Theater </a>

    
    
   
  </div>
  
  <div class="main">
    <h2>Created Pages will be visible here</h2>
    <p>This side navigation is of full height (100%) and always shown.</p>
    <p>Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
    <p>Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
  </div></>
  )
}

export default Sidebar