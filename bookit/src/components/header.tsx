import avatar from '../assets/avatar.png'

export default function Header() {
	return (
		<>
			<nav className='bg-[#0f1629] h-screen' >
				<div className="flex justify-between mx-8 py-4">

					<div className="logotip">
						<div className="img-logo"><img src="" alt="" /></div>
						<div className="logo text-white">Bookit</div>
					</div>
					<div className="accoutn flex flex-row items-center gap-2">
						<div className="acc-name text-white" >Azizbek</div>
						<div className="acc-image w-10 h-10"><img src={avatar} alt="Avatar" /></div>
					</div>
				</div>

			</nav>

		</>
	)
}