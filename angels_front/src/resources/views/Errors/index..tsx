import React from "react"
import Lottie from 'react-lottie';
import { Link } from "react-router-dom";
import anim404 from '../../assets/lottie/404.json';
import revokedRule from '../../assets/lottie/rules-revo.json';
// style
import './errors.css';

export const NotFound = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: anim404,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};

	return (
		<div className="notFound vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
			<div className="notFound_logo mb-4">
				<h1>Página não encontrada :(</h1>
			</div>
			<div className="anim404">
				<Lottie
					options={defaultOptions}
				/>
			</div>
			<span className="mt-4">Aparentemente esta página não está mais disponível no momento, acesse <Link style={{ color: 'var(--purple)' }} to="/">Anjos da Guarda</Link>.</span>
		</div>
	)
}

export const Revoked = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: revokedRule,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};

	return (
		<div className="vh-100 vw-100">
			<div className="notFound w-100 d-flex flex-column align-items-center">
				<div className="notFound_logo mb-4">
					<h1>Acesso não permitido ou revogado!</h1>
				</div>
				<div className="anim404">
					<Lottie
						options={defaultOptions}
					/>
				</div>
				<span className="mt-4">Você necessita se logar ou seu acesso foi revogado acesse: <Link style={{ color: 'var(--purple)' }} to="/login">Anjos da Guarda</Link> para se autenticar</span>
			</div>
		</div>
	)
}