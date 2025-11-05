import { useState } from 'react';

interface ChessBoardProps {
  position: string; // FEN notation
  onPieceDrop: (from: string, to: string) => boolean;
}

const pieceSymbols: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

const ChessBoard = ({ position, onPieceDrop }: ChessBoardProps) => {
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);

  const parseFEN = (fen: string) => {
    const board: (string | null)[][] = [];
    const rows = fen.split(' ')[0].split('/');
    
    rows.forEach(row => {
      const boardRow: (string | null)[] = [];
      for (const char of row) {
        if (isNaN(parseInt(char))) {
          boardRow.push(char);
        } else {
          for (let i = 0; i < parseInt(char); i++) {
            boardRow.push(null);
          }
        }
      }
      board.push(boardRow);
    });
    
    return board;
  };

  const board = parseFEN(position);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getSquareName = (row: number, col: number): string => {
    return `${files[col]}${ranks[row]}`;
  };

  const handleDragStart = (e: React.DragEvent, square: string, piece: string) => {
    setDraggedFrom(square);
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toSquare: string) => {
    e.preventDefault();
    if (draggedFrom && draggedPiece) {
      const success = onPieceDrop(draggedFrom, toSquare);
      if (!success) {
        // Invalid move
      }
    }
    setDraggedFrom(null);
    setDraggedPiece(null);
  };

  return (
    <div className="inline-block border-4 border-gray-800 shadow-2xl rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 gap-0" style={{ width: '600px', height: '600px' }}>
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const squareName = getSquareName(rowIndex, colIndex);
            const isDragging = draggedFrom === squareName;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`relative flex items-center justify-center cursor-pointer transition-all ${
                  isLight ? 'bg-amber-100' : 'bg-amber-700'
                } ${isDragging ? 'opacity-50' : ''} hover:brightness-95`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, squareName)}
              >
                {piece && (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, squareName, piece)}
                    className="text-7xl select-none cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                    style={{
                      color: piece === piece.toUpperCase() ? '#ffffff' : '#000000',
                      textShadow: piece === piece.toUpperCase() 
                        ? '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)'
                        : '2px 2px 4px rgba(255,255,255,0.5), -1px -1px 2px rgba(255,255,255,0.3)'
                    }}
                  >
                    {pieceSymbols[piece]}
                  </div>
                )}
                
                {/* Square coordinates */}
                {colIndex === 0 && (
                  <div className="absolute left-1 top-1 text-xs font-bold opacity-40">
                    {ranks[rowIndex]}
                  </div>
                )}
                {rowIndex === 7 && (
                  <div className="absolute right-1 bottom-1 text-xs font-bold opacity-40">
                    {files[colIndex]}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
