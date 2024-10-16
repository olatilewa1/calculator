import './navbar.css'
const Navbar = () => {
    return ( 
        <div>
            <nav>
            <h2>Logo</h2>

            <ul>
                <li><a href="#" style={{background:"black",color:"white",padding:"11px 27px", borderRadius:"8px"}}>home</a></li>
                <li><a href="#">about</a></li>
                <li><a href="#">contact</a></li>
                <li><a href="#">pending</a></li>
            </ul>
            <button className='btn'>click me</button>
            </nav>
        </div>
     );
}
 
export default Navbar;