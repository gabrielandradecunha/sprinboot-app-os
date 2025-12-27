import './style/Login.css'

export default function Login(){

    return(
        <div>
            <div className="login-container">
                <form className="login-form">
                    <h2>Login</h2>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}