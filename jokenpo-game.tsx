"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Mountain, FileText, Scissors } from "lucide-react"

type Choice = "rock" | "paper" | "scissors"
type GameResult = "win" | "lose" | "tie"

interface Score {
  wins: number
  losses: number
  ties: number
}

const choices: { value: Choice; icon: any; name: string; color: string }[] = [
  { value: "rock", icon: Mountain, name: "Pedra", color: "text-gray-600" },
  { value: "paper", icon: FileText, name: "Papel", color: "text-blue-600" },
  { value: "scissors", icon: Scissors, name: "Tesoura", color: "text-red-600" },
]

const getWinner = (player: Choice, computer: Choice): GameResult => {
  if (player === computer) return "tie"

  const winConditions: Record<Choice, Choice> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  }

  return winConditions[player] === computer ? "win" : "lose"
}

const getRandomChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length)
  return choices[randomIndex].value
}

export default function Component() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)
  const [score, setScore] = useState<Score>({ wins: 0, losses: 0, ties: 0 })
  const [isPlaying, setIsPlaying] = useState(false)

  const handleChoice = (choice: Choice) => {
    setPlayerChoice(choice)
    setIsPlaying(true)
    setResult(null)
    setComputerChoice(null)

    // Delay para criar suspense
    setTimeout(() => {
      const computerChoice = getRandomChoice()
      setComputerChoice(computerChoice)

      const gameResult = getWinner(choice, computerChoice)
      setResult(gameResult)

      // Atualizar placar
      setScore((prev) => ({
        ...prev,
        wins: prev.wins + (gameResult === "win" ? 1 : 0),
        losses: prev.losses + (gameResult === "lose" ? 1 : 0),
        ties: prev.ties + (gameResult === "tie" ? 1 : 0),
      }))

      setIsPlaying(false)
    }, 1500)
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setIsPlaying(false)
  }

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 })
    resetGame()
  }

  const getResultMessage = () => {
    if (!result) return ""

    switch (result) {
      case "win":
        return "🎉 Você ganhou!"
      case "lose":
        return "😔 Você perdeu!"
      case "tie":
        return "🤝 Empate!"
      default:
        return ""
    }
  }

  const getChoiceIcon = (choice: Choice | null) => {
    if (!choice) return null
    const choiceObj = choices.find((c) => c.value === choice)
    return choiceObj ? { icon: choiceObj.icon, color: choiceObj.color } : null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Jokenpô
            </CardTitle>
            <p className="text-muted-foreground">Pedra, Papel e Tesoura</p>
          </CardHeader>
        </Card>

        {/* Controles */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end">
              <Button onClick={resetScore} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar Placar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Placar */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  Vitórias: {score.wins}
                </Badge>
              </div>
              <div>
                <Badge variant="secondary">Empates: {score.ties}</Badge>
              </div>
              <div>
                <Badge variant="destructive">Derrotas: {score.losses}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Arena do Jogo */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Jogador */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Você</h3>
                <div className="flex justify-center items-center h-24">
                  {playerChoice ? (
                    (() => {
                      const choiceIcon = getChoiceIcon(playerChoice)
                      if (choiceIcon) {
                        const IconComponent = choiceIcon.icon
                        return <IconComponent className={`h-16 w-16 ${choiceIcon.color}`} />
                      }
                      return <div className="h-16 w-16 bg-gray-200 rounded-full" />
                    })()
                  ) : (
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-400">?</span>
                    </div>
                  )}
                </div>
              </div>

              {/* VS */}
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">VS</div>
                {result && <div className="mt-4 text-lg font-semibold animate-pulse">{getResultMessage()}</div>}
                {isPlaying && (
                  <div className="mt-4 text-sm text-muted-foreground animate-pulse">Computador pensando...</div>
                )}
              </div>

              {/* Computador */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Computador</h3>
                <div className="flex justify-center items-center h-24">
                  {isPlaying ? (
                    <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
                      <span className="text-gray-500">?</span>
                    </div>
                  ) : computerChoice ? (
                    (() => {
                      const choiceIcon = getChoiceIcon(computerChoice)
                      if (choiceIcon) {
                        const IconComponent = choiceIcon.icon
                        return <IconComponent className={`h-16 w-16 ${choiceIcon.color}`} />
                      }
                      return <div className="h-16 w-16 bg-gray-200 rounded-full" />
                    })()
                  ) : (
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-400">?</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Escolha */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center text-lg font-semibold mb-4">Faça sua escolha:</h3>
            <div className="grid grid-cols-3 gap-4">
              {choices.map((choice) => {
                const IconComponent = choice.icon
                return (
                  <Button
                    key={choice.value}
                    onClick={() => handleChoice(choice.value)}
                    disabled={isPlaying}
                    className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                    variant="outline"
                  >
                    <IconComponent className={`h-8 w-8 ${choice.color}`} />
                    <span className="text-sm">{choice.name}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Botão Nova Rodada */}
        {result && (
          <div className="text-center">
            <Button onClick={resetGame} size="lg">
              Nova Rodada
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
