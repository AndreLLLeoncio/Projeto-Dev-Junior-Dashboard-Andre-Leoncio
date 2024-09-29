import RegisterForm from "../../components/RegisterForm";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import LoginPageIcon from "../../../public/login-page-img";

export default function register() {
  
  return (
    <div className="flex flex-row">



      {/* Tela Esquerda */}
      <div className="w-[50%] h-[100vh] flex flex-col items-center justify-center">

        <div className="w-full h-[10%] flex flex-row space-x-3 items-center">
          <SiGoogletasks className="size-8 ml-8"/> <p className="text-2xl">TaskFlow</p>
        </div>

        <div className="w-2/3 h-[90%]">
          <div className="mt-16">
              <h1 className="text-3xl mb-3">Seja Bem Vindo</h1>
              <p className="text-gray-700">Por Favor Entre com as Suas Credenciais</p>

              <div className="mt-5">

                <RegisterForm/>


              <Button className="w-full h-12 mt-5 text-md" variant="outline">
                <FaGoogle className="mr-3 size-5"/>Cadastrar com o Google
              </Button>

              <div className="flex items-center justify-center mt-5">
              <span>Ja possui uma Conta? <a className="underline" href="/login">Entrar</a></span>

              </div>

            </div>  
            
          </div>

        </div>

      </div>


      {/* Tela Direita */}
      <div className="w-[50%] h-[100vh] bg-black flex items-center justify-center">
        <div className="w-[90%] flex items-center justify-center">
          <LoginPageIcon />
        </div>
      </div>

    </div>
  );
}
