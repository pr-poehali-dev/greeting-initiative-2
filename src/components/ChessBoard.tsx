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
    <div className="inline-block border-8 border-gray-900 shadow-2xl rounded-2xl overflow-hidden bg-gray-900">
      <div className="grid grid-cols-8 gap-0" style={{ width: '800px', height: '800px' }}>
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const squareName = getSquareName(rowIndex, colIndex);
            const isDragging = draggedFrom === squareName;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`relative flex items-center justify-center cursor-pointer transition-all ${
                  isLight ? 'bg-amber-50' : 'bg-amber-800'
                } ${isDragging ? 'opacity-50' : ''} hover:brightness-110 hover:shadow-inner`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, squareName)}
                style={{ width: '100px', height: '100px' }}
              >
                {piece && (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, squareName, piece)}
                    className="select-none cursor-grab active:cursor-grabbing hover:scale-125 transition-all duration-200"
                    style={{
                      fontSize: '80px',
                      color: piece === piece.toUpperCase() ? '#ffffff' : '#1a1a1a',
                      textShadow: piece === piece.toUpperCase() 
                        ? '3px 3px 6px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.6)'
                        : '3px 3px 6px rgba(255,255,255,0.6), -1px -1px 3px rgba(255,255,255,0.4)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                  >
                    {pieceSymbols[piece]}
                  </div>
                )}
                
                {/* Square coordinates */}
                {colIndex === 0 && (
                  <div className={`absolute left-2 top-2 text-sm font-bold ${isLight ? 'text-amber-800' : 'text-amber-100'} opacity-50`}>
                    {ranks[rowIndex]}
                  </div>
                )}
                {rowIndex === 7 && (
                  <div className={`absolute right-2 bottom-2 text-sm font-bold ${isLight ? 'text-amber-800' : 'text-amber-100'} opacity-50`}>
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