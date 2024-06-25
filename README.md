---
cssclasses: []
---
# Capítulo 1: Introdução
Abordaremos a importância do estudo e da simulação de arquiteturas de processadores, com foco particular na arquitetura MIPS64 e na ferramenta EduMIPS64. A compreensão dos processadores e suas operações é essencial para estudantes e profissionais de engenharia da computação, pois permite o desenvolvimento de software mais eficiente e a otimização de sistemas de hardware.

## Objetivo do Estudo
O objetivo principal deste estudo é explorar e analisar a arquitetura do processador MIPS64, utilizando a ferramenta de simulação EduMIPS64. Através de simulações e questionários, buscamos entender melhor o funcionamento interno dos processadores, a execução de instruções, a gestão de ciclos de relógio e a eficiência do código executado. Este conhecimento é crucial para otimizar programas, melhorando seu desempenho e eficiência.
# Capítulo 2: Descrição da ferramenta Edumips64
## Principais Características do EduMIPS64
### Interface Gráfica
A interface gráfica do EduMIPS64 é projetada para ser amigável e interativa, ajudando os estudantes a compreenderem melhor o funcionamento interno de um processador MIPS64. A interface inclui:

Janela de Registros: Exibe o estado atual dos registros do processador.
Janela de Memória: Mostra o conteúdo da memória principal.
Painel de Controle: Para iniciar, pausar e depurar a execução do programa.
Simulação e Depuração
As configurações do EduMIPS64 são acessíveis através de um menu dedicado, onde os usuários podem ajustar parâmetros do simulador.
# Capítulo 3: Questionário
## Questão 1
👍
## Questão 2
**Cycles = 350**
É o número de ciclos de relógio que o programa levou para completar sua execução.

**Instructions = 201**
É o número de instruções executadas durante a execução do programa.

**CPI = 1.741**
É a a razão entre o número de ciclos e o número de instruções, que equivale ao número médio de ciclos do relógio que cada instrução leva para ser executada.

**Stalls = 105**
A quantidade de ciclos do relógio em que a execução do programa foi atrasada para evitar os riscos da pipeline.
## Questão 3
Houve 105 paradas por conflitos do tipo Read After Write.
## Questão 4
👍
## Questão 5
👍
## Questão 6
**Cycles = 245**
É o número de ciclos de relógio que o programa levou para completar sua execução.

**Instructions = 201**
É o número de instruções executadas durante a execução do programa.

**CPI = 1.218**
É a a razão entre o número de ciclos e o número de instruções, que equivale ao número médio de ciclos do relógio que cada instrução leva para ser executada.

**Stalls = 0**
A quantidade de ciclos do relógio em que a execução do programa foi atrasada para evitar os riscos da pipeline.
## Questão 7
Depois que o adiantamento foi acionado, não houve nenhuma parada por conflito.
## Questão 8
A quantidade de instruções nos itens 2 e 6 foram a mesma, já que o algoritmo não mudou. No item 6 não houve paradas por conflito, em contraste com o item 2, onde aconteceram 105. Isso se dá pelo mecanismo de adiantamento que permite que os dados pulem estágios da pipeline para evitar esperas. Como vários ciclos de relógio foram perdidos em stalls no item 2, o número de ciclos e, consequentemente, a CPI, foram bem menores no item 6.
## Questão 9
👍
## Questões 10-11
### Sem Adiantamento
#### Instructions:
3 instruções são executadas inicialmente, 8 dentro do loop, e 1 instrução de parada no final. O loop passa por uma iteração para cada um dos 128 elementos do array. Portanto, temos que o número de instruções será:
$$
{4}+({8}\times{128}) = 1028
$$
#### Stalls:
```
main: 
    DADDI R3,R0,8               ;1
    DADDI R1,R0,1024            ;2          
    DADDI R2,R0,1024            ;3            
Loop:          
    L.D F0,0(R1)                ;4
    MUL.D F0,F0,F2              ;5
    L.D F4,0(R2)                ;6
    ADD.D F0,F0,F4              ;7
    S.D F0,0(R2)                ;8
    DSUB R1,R1,R3               ;9
    DSUB R2,R2,R3               ;10
BNEZ R1,Loop                    ;11
HALT                            ;12
```

Antes do loop
2 e 4: 1 ciclo (evitável com forwarding)

Dentro do Loop:
4 e 5: 2 ciclos. (1 evitável com forwarding)
5 e 7: 7 ciclos. (2 são evitáveis com forwarding)
7 e 8: 5 ciclos  (2 são evitáveis com forwarding)
9 e 11: 1 ciclo (evitável com forwarding)

Total = 128 x (15) + 1 = 1921

#### Cycles
4 ciclos para encher a pipeline
1028 ciclos onde uma nova instrução é buscada
1921 ciclos onde ocorre um stall
1 ciclo de esvaziamento da pipeline para cada uma das 127 iterações do loop em que R1 era diferente de zero.

Total = 4 + 1028 + 1921 + 1*(128-1) = 3080 ciclos

#### CPI
$$
\frac{3080}{1028} \approx 2.99
$$
### Com Adiantamento
#### Instructions:
Mesma quantidade: 1028 instruções.

#### Stalls:
```
main: 
    DADDI R3,R0,8               ;1
    DADDI R1,R0,1024            ;2          
    DADDI R2,R0,1024            ;3            
Loop:          
    L.D F0,0(R1)                ;4
    MUL.D F0,F0,F2              ;5
    L.D F4,0(R2)                ;6
    ADD.D F0,F0,F4              ;7
    S.D F0,0(R2)                ;8
    DSUB R1,R1,R3               ;9
    DSUB R2,R2,R3               ;10
BNEZ R1,Loop                    ;11
HALT                            ;12
```

Dentro do Loop:
4 e 5: 1 RAW
5 e 7: 5 RAW
5 e 7: 1 WAW
7 e 8: 3 RAW

Total = 128 x (1+5+3) RAW + 128 x 1 WAW = 1152 RAW e 128 WAW = 1280 Stalls.


#### Cycles
4 ciclos para encher a pipeline
1028 ciclos onde uma nova instrução é buscada
1280 ciclos onde ocorre um stall
1 ciclo de esvaziamento da pipeline para cada uma das 127 iterações do loop em que R1 era diferente de zero.

Total = 4 + 1028 + 1280 + 1*(128-1) = 2439 ciclos.


#### CPI
$$
\frac{2439}{1028} \approx 2.37
$$
## Questão 12
👍
## Questão 13
São iguais.
## Questão 14
Houve parada por conflito. Sem o adiantamento de dados, tivemos 1921 Stalls do tipo RAW. Com o adiantamento de dados habilitado, algumas dessas paradas foram eliminadas, mas novos stalls do tipo WAW foram introduzidos, somando um total de 1280 Stalls (1152 RAW e 128 WAW).
## Questão 15
O número de instruções permanece o mesmo nas duas execuções, já que o algoritmo não foi alterado. A quantidade total de stalls diminui com o adiantamento de dados, já que várias paradas do tipo RAW são evitadas pela técnica. Isso acarreta na diminuição da quantidade de ciclos que o programa leva para completar a execução, que por sua vez implica na diminuição da CPI.
## Questão 16
Sim. É possível evitar as paradas da pipeline rearrumando as instruções de forma que as instruções com dependência de dados fiquem mais distantes uma da outra.
## Questão 17
> [!info] Adicionamos um vetor de teste, assim como um valor arbitrário para F2, com o propósito de testar o programa.
```
.data
vet:    .double 0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0, 34.0, 35.0, 36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0, 43.0, 44.0, 45.0, 46.0, 47.0, 48.0, 49.0, 50.0, 51.0, 52.0, 53.0, 54.0, 55.0, 56.0, 57.0, 58.0, 59.0, 60.0, 61.0, 62.0, 63.0, 64.0, 65.0, 66.0, 67.0, 68.0, 69.0, 70.0, 71.0, 72.0, 73.0, 74.0, 75.0, 76.0, 77.0, 78.0, 79.0, 80.0, 81.0, 82.0, 83.0, 84.0, 85.0, 86.0, 87.0, 88.0, 89.0, 90.0, 91.0, 92.0, 93.0, 94.0, 95.0, 96.0, 97.0, 98.0, 99.0, 100.0, 101.0, 102.0, 103.0, 104.0, 105.0, 106.0, 107.0, 108.0, 109.0, 110.0, 111.0, 112.0, 113.0, 114.0, 115.0, 116.0, 117.0, 118.0, 119.0, 120.0, 121.0, 122.0, 123.0, 124.0, 125.0, 126.0, 127.0

constant: .double 2.0

.text
main:
    L.D F2, constant(R0)
    DADDI R3,R0,8
    DADDI R1,R0,1024
    DADDI R2,R0,1024
Loop:
    L.D F0,0(R1)
    L.D F4,0(R2)
    MUL.D F0,F0,F2
    DSUB R1,R1,R3
    DSUB R2,R2,R3
    ADD.D F0,F0,F4
    S.D F0,8(R2)
BNEZ R1,Loop
HALT
```
### Cycles
Sem adiantamento: 2697 ciclos
Com adiantamento: 2184 ciclos
O número de ciclos diminui com o adiantamento pois menos ciclos são desperdiçados com stalls.
### Instructions
Sem adiantamento: 1029 instruções
Com adiantamento: 1029 instruções
Nenhuma diferença era esperada, já que o algoritmo é o mesmo.
### CPI
Sem adiantamento: 2.620 ciclos por instrução
Com adiantamento: 2.122 ciclos por instrução
A CPI diminui bastante com o adiantamento, já que o número de ciclos diminui e a quantidade de instruções permanece a mesma.
### Stalls
Sem adiantamento: 1537 Stalls (RAW)
Com adiantamento: 1024 Stalls (896 RAW e 128 WAW)
Há uma diminuição substancial nos stalls RAW, já que a pipeline não precisa esperar os estágios MEM e WB antes de cada acesso pós-escrita. Alguns desses stalls, no entanto, são substituídos por WAW.
## Questão 18
> [!info] Adicionamos um vetor de teste, assim como um valor arbitrário para F2, com o propósito de testar o programa.

> [!warning] O loop opera de 7 em 7 elementos para agrupar ao máximo (dentro do limite de registradores disponíveis) as instruções similares, evitando stalls. Não usamos a capacidade máxima de 8 elementos por loop porque o registrador F2 é reservado para a constante inicial. Como 7 não é divisor do tamanho do array, operamos nos 2 elementos que sobraram fora do loop.

```
.data
vet:    .double 0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0, 34.0, 35.0, 36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0, 43.0, 44.0, 45.0, 46.0, 47.0, 48.0, 49.0, 50.0, 51.0, 52.0, 53.0, 54.0, 55.0, 56.0, 57.0, 58.0, 59.0, 60.0, 61.0, 62.0, 63.0, 64.0, 65.0, 66.0, 67.0, 68.0, 69.0, 70.0, 71.0, 72.0, 73.0, 74.0, 75.0, 76.0, 77.0, 78.0, 79.0, 80.0, 81.0, 82.0, 83.0, 84.0, 85.0, 86.0, 87.0, 88.0, 89.0, 90.0, 91.0, 92.0, 93.0, 94.0, 95.0, 96.0, 97.0, 98.0, 99.0, 100.0, 101.0, 102.0, 103.0, 104.0, 105.0, 106.0, 107.0, 108.0, 109.0, 110.0, 111.0, 112.0, 113.0, 114.0, 115.0, 116.0, 117.0, 118.0, 119.0, 120.0, 121.0, 122.0, 123.0, 124.0, 125.0, 126.0, 127.0
constant: .double 2.0
.text
main:
    DADDI R1, R0, 1008 
    DADDI R2, R0, 1008   
    L.D F2, constant(R0)  
    ; Fazer operações nos elementos 128 e 127 do array antes de iniciar o loop.
	    L.D F0, 8(R1)
	    L.D F4, 16(R1)
	    L.D F16, 8(R2)
	    L.D F18, 16(R2)
	    MUL.D F0, F0, F2
	    MUL.D F4, F4, F2
	    DADDI R4, R0, 56   ;Colocando esta instrução aqui, reduzimos o número de stalls em 1.  
	    ADD.D F0, F0, F16
	    ADD.D F4, F4, F18
	    S.D F0, 8(R2)
	    S.D F4, 16(R2)
Loop:
    ; Carrega 7 elementos do endereço R1
	    L.D F0, 0(R1)
	    L.D F4, -8(R1)
	    L.D F6, -16(R1)
	    L.D F8, -24(R1)
	    L.D F10, -32(R1)
	    L.D F12, -40(R1)
	    L.D F14, -48(R1)
    ; Carrega 7 elementos do endereço R2
	    L.D F16, 0(R2)
	    L.D F18, -8(R2)
	    L.D F20, -16(R2)
	    L.D F22, -24(R2)
	    L.D F24, -32(R2)
	    L.D F26, -40(R2)
	    L.D F28, -48(R2)
    ; Atualiza R1 e R2 para a próxima iteração
	    DSUB R1, R1, R4
	    DSUB R2, R2, R4
    ; Multiplica elementos por F2
	    MUL.D F0, F0, F2
	    MUL.D F4, F4, F2
	    MUL.D F6, F6, F2
	    MUL.D F8, F8, F2
	    MUL.D F10, F10, F2
	    MUL.D F12, F12, F2
	    MUL.D F14, F14, F2
    ; Adicionar elementos correspondentes de R2
	    ADD.D F0, F0, F16	
	    ADD.D F4, F4, F18	
	    ADD.D F6, F6, F20	
	    ADD.D F8, F8, F22	
	    ADD.D F10, F10, F24	
	    ADD.D F12, F12, F26	
	    ADD.D F14, F14, F28
    ; Guardar os resultados na memória
	    S.D F0, 56(R2)	
	    S.D F4, 48(R2)	
	    S.D F6, 40(R2)
	    S.D F8, 32(R2)
	    S.D F10, 24(R2)
	    S.D F12, 16(R2)
	    S.D F14, 8(R2)
BNEZ R1, Loop
HALT
```
## Questão 19
### Cycles
Sem adiantamento: 838 ciclos
Com adiantamento: 836 ciclos
O número de ciclos diminui com o adiantamento pois menos ciclos são desperdiçados com stalls.
### Instructions
Sem adiantamento: 699 instruções
Com adiantamento: 699 instruções
Nenhuma diferença era esperada, já que o algoritmo é o mesmo.
### CPI
Sem adiantamento: 1.198 ciclos por instrução
Com adiantamento: 1.195 ciclos por instrução
A CPI diminui bastante com o adiantamento, já que o número de ciclos diminui e a quantidade de instruções permanece a mesma.
### Stalls
Sem adiantamento: 100 Stalls (46 RAW e 54 estruturais de memória)
Com adiantamento: 80 Stalls (6 RAW e 19 WAW, 55 estruturais de memória)
Há uma diminuição substancial nos stalls RAW, já que a pipeline não precisa esperar os estágios MEM e WB antes de cada acesso pós-escrita. Alguns desses stalls, no entanto, são substituídos por WAW.
## Questão 20
### Instructions
#### Original
Sem adiantamento: 1029 instruções (1 para o teste)
Com adiantamento: 1029 instruções (1 para o teste)
#### Reordenado
Sem adiantamento: 1029 instruções (1 para o teste)
Com adiantamento: 1029 instruções (1 para o teste)
#### Desenrolado
Sem adiantamento: 699 instruções (1 para o teste)
Com adiantamento: 699 instruções (1 para o teste)
### Stalls
#### Original
Sem adiantamento: 1921 Stalls (RAW)
Com adiantamento: 1280 Stalls (1152 RAW e 128 WAW)
#### Reordenado
Sem adiantamento: 1537 Stalls (RAW)
Com adiantamento: 1024 Stalls (896 RAW e 128 WAW)
#### Desenrolado
Sem adiantamento: 100 Stalls (46 RAW e 54 estruturais de memória)
Com adiantamento: 80 Stalls (6 RAW e 19 WAW, 55 estruturais de memória)
### Cycles
#### Original
Sem adiantamento: 3080 ciclos
Com adiantamento: 2439 ciclos
#### Reordenado
Sem adiantamento: 2697 ciclos
Com adiantamento: 2184 ciclos
#### Desenrolado
Sem adiantamento: 838
Com adiantamento: 836
### CPI
#### Original
Sem adiantamento: 2.99
Com adiantamento: 2.37
#### Reordenado
Sem adiantamento: 2.620
Com adiantamento: 2.122
#### Desenrolado
Sem adiantamento: 1.198
Com adiantamento: 1.195

### Análise
## Instructions
A quantidade de instruções não varia entre os cenários original, reordenado e desenrolado, com exceção do código desenrolado, onde há uma redução significativa no número de instruções.
Essa redução no código desenrolado reflete a diminuição das instruções de controle de loop devido ao desenrolamento de loops, o que melhora a eficiência ao reduzir o overhead das instruções de controle.

## Stalls
A reordenação e o desenrolamento de loops são eficazes em reduzir o número de stalls, particularmente os stalls RAW. A introdução do adiantamento também mostra uma redução significativa nos stalls, especialmente no cenário original e reordenado.

## Cycles
O código desenrolado é significativamente mais eficiente, necessitando de muito menos ciclos para a execução. O adiantamento melhora o desempenho em todos os casos, mas é mais impactante no código original e reordenado do que no desenrolado

## CPI
O CPI do código desenrolado é significativamente menor, indicando uma execução mais eficiente das instruções. O adiantamento também reduz o CPI em todos os casos, sendo mais eficaz em cenários com maior número de stalls.

## Resumo
O desenrolamento de loops e a reordenação de instruções são técnicas poderosas para otimizar o código, reduzindo significativamente o número de ciclos e o CPI. As técnicas de adiantamento complementam essas otimizações, reduzindo ainda mais os stalls e melhorando a eficiência da execução. No entanto, a eficácia do adiantamento é mais evidente em códigos com maior número de dependências e stalls, como no caso do código original e reordenado.