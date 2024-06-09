import { FaSearch } from "react-icons/fa";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useRef, useState } from "react";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dddRef = useRef<HTMLParagraphElement>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const handleClick = () => {
    const inputValue = inputRef.current?.value.trim() || "";
    const hasAlphabeticChars = /[a-zA-Z]/.test(inputValue);

    if (!inputValue || inputValue.length !== 8 || hasAlphabeticChars) {
      setShowError(true);
    } else {
      setShowError(false);
      fetch(`https://viacep.com.br/ws/${inputValue}/json/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dddRef.current &&
            (dddRef.current.innerHTML = `CEP: ${data.cep} <br> ${data.bairro}, ${data.localidade} - ${data.uf} <br> DDD: (${data.ddd})`);
        });
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Buscador de CEP</CardTitle>
          <CardDescription>Digite pelo CEP que deseja buscar</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <CardDescription ref={dddRef}></CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row gap-1">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Digite um CEP"
                  ref={inputRef}
                  maxLength={8}
                />
              </div>
              <Button
                variant="default"
                aria-label="search button"
                onClick={handleClick}
              >
                <FaSearch />
              </Button>
            </div>
            {showError && (
              <p className="pl-3 text-xs text-red-500">CEP inválido</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;
