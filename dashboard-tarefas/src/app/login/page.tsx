import LoginForm from "../../components/loginForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import LoginPageIcon from "../../../public/login-page-img";

export default function login() {
  
  return (
    <div className="flex lg:flex-row flex-col">



      {/* Tela Esquerda */}
      <div className="lg:w-[50%] w-full h-[100vh] flex flex-col items-center justify-center">

        <div className="w-full h-[10%] flex flex-row space-x-3 items-center">
          <SiGoogletasks className="size-8 ml-8"/> <p className="text-2xl">TaskFlow</p>
        </div>

        <div className="md:w-2/3 w-10/12 h-[90%]">
          <div className="mt-16">
              <h1 className="text-3xl mb-3">Seja Bem Vindo</h1>
              <p className="text-gray-700">Por Favor Entre com as Suas Credenciais</p>

              <div className="mt-5">

                <LoginForm/>

              <div className="flex mt-4">

                <div className="items-top flex space-x-2 items-center">
                  <Checkbox/>
                  <p>Lembre de Mim</p>
                </div>

                <div className="ml-auto">
                  <a className="underline" href="">Esqueci a Senha</a>
                </div>

              </div>

              <Button className="w-full h-12 mt-5 text-md" variant="outline">
                <FaGoogle className="mr-3 size-5"/>Entrar com o Google
              </Button>

              <div className="flex items-center justify-center mt-5">
              <span>Não possui uma Conta? <a className="underline" href="/register">Criar</a></span>

              </div>

            </div>  
            
          </div>

        </div>

      </div>


      {/* Tela Direita */}
      <div className="lg:w-[50%] w-full h-[100vh] bg-black lg:flex hidden items-center justify-center">
        <div className="w-[90%] flex items-center justify-center">
          <LoginPageIcon />
        </div>
      </div>

    </div>
  );
}
