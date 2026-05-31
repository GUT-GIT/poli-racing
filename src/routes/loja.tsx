import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, ArrowLeft, Menu, X, ChevronLeft, ChevronRight, Copy, Check, QrCode } from "lucide-react";

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: "Loja Poli Racing — Produtos Oficiais" },
      {
        name: "description",
        content:
          "Loja oficial da Poli Racing. Camisetas, bonés, canecas e kits adesivos da equipe de Fórmula SAE da USP.",
      },
      { property: "og:title", content: "Loja Poli Racing — Produtos Oficiais" },
      {
        property: "og:description",
        content: "Camisetas, bonés, canecas e kits adesivos da equipe de Fórmula SAE da USP.",
      },
    ],
  }),
  component: LojaPage,
});

const categorias = ["Todos", "Vestuário", "Acessórios", "Kits"] as const;
type Categoria = (typeof categorias)[number];

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: Categoria;
  imagem: string[];
}

const produtos: Produto[] = [
  {
    id: "camiseta-oficial-polo",
    nome: "Camiseta Oficial 25/26",
    preco: 75,
    categoria: "Vestuário",
    imagem: ["/broche1.jpeg", "/broche2.jpeg", "/broche3.jpeg" ],
  },
  {
    id: "bone",
    nome: "Boné Poli Racing",
    preco: 59.99,
    categoria: "Vestuário",
    imagem: ["/placeholder.svg"],
  },
  {
    id: "kit-adesivos",
    nome: "Kit Adesivos",
    preco: 10,
    categoria: "Kits",
    imagem: ["/placeholder.svg"],
  },
  {
    id: "kit-presente",
    nome: "Kit Presente",
    preco: 10,
    categoria: "Kits",
    imagem: ["/placeholder.svg"],
  },
  {
    id: "camiseta-lançamento FP17",
    nome: "Camiseta Lançamento FP17",
    preco: 69.9,
    categoria: "Vestuário",
    imagem: ["/placeholder.svg"],
  },
];

function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function GaleriaImagens({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => (i === imagens.length - 1 ? 0 : i + 1));
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => (i === 0 ? imagens.length - 1 : i - 1));
  };

  return (
    <div className="relative aspect-square bg-surface-elevated overflow-hidden group">
      {imagens.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/60">
          <ShoppingCart size={18} />
          <span className="text-xs uppercase tracking-[0.2em]">Sem Imagem</span>
        </div>
      ) : (
        <>
          <img
            src={imagens[index]}
            alt={`${nome} - Imagem ${index + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {/* Botões do Carrossel (Só aparecem se tiver mais de 1 imagem e passar o mouse) */}
          {imagens.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight size={18} />
              </button>
              
              {/* Bolinhas de indicação (Dots) embaixo da imagem */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {imagens.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === index ? "bg-primary w-3" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function LojaPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>("Todos");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [produtoPagamento, setProdutoPagamento] = useState<Produto | null>(null);
  const [copiado, setCopiado] = useState(false);
  const WHATSAPP_NUMBER = "5511916868616"; 
  const copiarChavePix = () => {
    // Substitua pelo CNPJ, E-mail ou Telefone da chave Pix da Equipe
    navigator.clipboard.writeText("00.000.000/0001-00"); 
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000); // Volta ao normal após 2 segundos
  };

  const produtosFiltrados =
    categoriaAtiva === "Todos"
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaAtiva);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold tracking-tight">
            <img src="/logo.png" alt="Poli Racing" className="w-8 h-8 object-contain" />
            <span className="text-foreground">Poli Racing</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-7 text-sm">
            <li>
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Voltar ao Site
              </Link>
            </li>
            <li>
              <span className="text-primary font-semibold">Loja</span>
            </li>
          </ul>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {mobileOpen && (
          <ul className="lg:hidden border-t border-border bg-background px-6 py-4 space-y-3 text-sm">
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block text-muted-foreground hover:text-primary"
              >
                Voltar ao Site
              </Link>
            </li>
            <li>
              <span className="block text-primary font-semibold">Loja</span>
            </li>
          </ul>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-24 pb-12 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-6 text-center w-full">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Produtos Oficiais
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-gradient">
            Loja Poli Racing
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Vista o espírito da competição. Cada compra apoia diretamente o projeto FP17 e a
            formação de engenheiros da USP.
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  categoriaAtiva === cat
                    ? "bg-primary text-primary-foreground glow"
                    : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="group flex flex-col rounded-2xl bg-surface border border-border overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                {/*
                 Imagem 
                <div className="aspect-square relative bg-surface-elevated overflow-hidden">
                  <div className="absolute inset-0 image-placeholder flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
                      <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                        <ShoppingCart size={18} />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em]">Imagem</span>
                    </div>
                  </div>
                </div>
                */}

                {/* Galeria de Imagens do Produto */}
                <GaleriaImagens imagens={produto.imagem} nome={produto.nome} />

                {/* Info */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-xs uppercase tracking-wider text-primary mb-1">
                    {produto.categoria}
                  </span>
                  <h3 className="font-display font-semibold text-foreground text-lg leading-tight mb-2">
                    {produto.nome}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {formatarPreco(produto.preco)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setProdutoPagamento(produto); // Abre a janela do Pix com este produto
                    }}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform glow"
                  >
                    <QrCode size={18} />
                    Comprar via Pix
                  </button>
                    <ShoppingCart size={18} />
                    Comprar
                </div>
              </div>
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-surface/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-bold tracking-tight">
            <img src="/logo.png" alt="Poli Racing" className="w-6 h-6 object-contain" />
            <span className="text-foreground text-sm">Poli Racing</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Poli Racing. Todos os direitos reservados. Escola Politécnica da Universidade de
            São Paulo.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        </div>
      </footer>
      {/* 👇 MODAL DE PAGAMENTO PIX 👇 */}
      {produtoPagamento && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 relative flex flex-col items-center animate-in zoom-in-95 duration-200 shadow-2xl">
            
            {/* Botão Fechar */}
            <button 
              onClick={() => setProdutoPagamento(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X size={24} />
            </button>

            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary mb-4">
              <QrCode size={24} />
            </div>
            
            <h3 className="text-2xl font-display font-bold text-foreground mb-1">Pagamento via Pix</h3>
            <p className="text-muted-foreground text-center mb-6">
              Escaneie o QR Code para pagar <strong className="text-foreground">{produtoPagamento.nome}</strong>
            </p>

            {/* Imagem do QR Code (Salve o qr-code real da equipe na pasta public) */}
            <div className="bg-white p-3 rounded-xl mb-4">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Exemplo" 
                alt="QR Code Pix" 
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>

            <p className="text-3xl font-bold text-primary mb-6">
              {formatarPreco(produtoPagamento.preco)}
            </p>

            {/* Botão Pix Copia e Cola */}
            <div className="w-full mb-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 text-center">Ou use a chave (CNPJ / E-mail)</p>
              <button 
                onClick={copiarChavePix}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors group"
              >
                <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground">00.000.000/0001-00</span>
                {copiado ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-muted-foreground group-hover:text-primary" />}
              </button>
            </div>

            {/* Botão de Enviar Comprovante */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Acabei de fazer um Pix no valor de R$ ${produtoPagamento.preco.toFixed(2)} referente ao produto: *${produtoPagamento.nome}*. Segue o comprovante abaixo:`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setProdutoPagamento(null)}
              className="w-full py-3 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors text-center"
            >
              Enviar comprovante no WhatsApp
            </a>

          </div>
        </div>
      )}
    </div>
  );
}
