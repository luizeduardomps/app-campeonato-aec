// __tests__/app.test.tsx
import { validateMatchup } from "../src/utils/validations";
import { GameDetails } from "../components/GameDetails";
import { BotaoAcao } from "../components/BotaoAcao";

describe("Testes Unitários", () => {
  it("1. deve invalidar o confronto se o time for escalado contra ele mesmo", () => {
    const resultado = validateMatchup("Real Madruga", "Real Madruga");
    expect(resultado).toBe(false); // Espera que o sistema barre o jogo
  });

  it("2. deve injetar os times corretamente no componente PlacarDestaque", () => {
    // Renderizamos o componente na memória chamando-o como uma função pura
    const componente = GameDetails({
      timeA: "Lobos FC",
      timeB: "Galáticos Fut7",
    });

    // O children de PlacarDestaque é um array com 3 textos: [TimeA, 'X', TimeB]
    const timeARenderizado = componente.props.children[0].props.children;
    const timeBRenderizado = componente.props.children[2].props.children;

    expect(timeARenderizado).toBe("Lobos FC");
    expect(timeBRenderizado).toBe("Galáticos Fut7");
  });

  it("3. deve travar o clique e acionar a transparência quando o BotaoAcao estiver carregando", () => {
    const componente = BotaoAcao({
      titulo: "Salvar Partida",
      onPress: () => {},
      isLoading: true,
    });

    expect(componente.props.disabled).toBe(true);

    const estiloDeOpacidade = componente.props.style[3];
    expect(estiloDeOpacidade).toEqual({ opacity: 0.6 });
  });
});
