import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase';
import { FRASES } from './frases-mock';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao = 'Traduza a frase:';
  public resposta: string;

  public rodada = 0;
  public rodadaFrase: Frase;
  public progresso = 0;
  public tentativas = 3;

  @Output() public encerrarJogo:EventEmitter<string> = new EventEmitter();


  constructor() {
    this.rodadaFrase = this.frases[this.rodada];
  }

  ngOnInit() {
  }

  public atualizaReposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr === this.resposta) {
      this.rodada++;
      this.progresso = this.progresso + (100 / this.frases.length);

      if (this.rodada === 4) {
        alert('Concluiu as traduções com sucesso!');
        this.encerrarJogo.emit('vitória');
      }

      this.rodadaFrase = this.frases[this.rodada];

    } else {
      this.tentativas--;

      if (this.tentativas === -1) {
        alert('Você perdeu todas tentativas');
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  ngOnDestroy() {
  }
}
