  import { Injectable, Inject, Injector } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Usuario } from "../../modelo/usuario";


@Injectable({
    providedIn: "root"
   })
export class UsuarioServico {
    private baseUrl: string;
    private test: Usuario;
    private _usuario: Usuario;

   
    set usuario(usuario: Usuario) {
        sessionStorage.setItem("usuario-autenticado", JSON.stringify (usuario))
        this._usuario = usuario;
    }
    get usuario(): Usuario {
        let usuario_json = sessionStorage.getItem("usuario_autenticado");
        this._usuario = JSON.parse(usuario_json);
        return this._usuario
    }


    public usuarioAutenticado(): boolean {

        return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";
    }

    public limpar_sessao() {
        sessionStorage.setItem("usuario_autenticado", "");
        this._usuario = null;
    }

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public verificarUsuario(usuario: Usuario): Observable<Usuario> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        

        this.test = usuario; 
        var body = {
            email: usuario.email,
            senha: usuario.senha
        }
        


        return this.http.post<Usuario>(this.baseUrl + "api/usuario/verificarUsuario", body, { headers });
    }


}
