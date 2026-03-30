import React from 'react';

// A simple Button component
export const Button = ({ onClick, children, variant, size, loading }) => {
  const styles = {
    primary: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
    },
    large: {
      fontSize: '1.2rem',
    }
  };

  const style = {
    ...styles[variant],
    ...styles[size],
  };

  return (
    <button onClick={onClick} style={style} disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

// A simple Card component
export const Card = ({ children, elevation, padding, bordered }) => {
    const style = {
        boxShadow: elevation === 'md' ? '0 4px 8px 0 rgba(0,0,0,0.2)' : 'none',
        padding: padding === 'lg' ? '20px' : '10px',
        border: bordered ? '1px solid #ddd' : 'none',
        borderRadius: '5px',
        margin: '10px'
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
};

Card.Title = ({ children }) => <h3 style={{ marginTop: 0 }}>{children}</h3>;
Card.Content = ({ children }) => <div>{children}</div>;
Card.Actions = ({ children }) => <div style={{ marginTop: '10px' }}>{children}</div>;

// Example Usage:

/*
const MyComponent = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div>
            <Button 
              variant="primary" 
              size="lg"
              loading={isLoading}
              onClick={handleClick}
            >
              Boshlash
            </Button>

            <Card 
              elevation="md"
              padding="lg"
              bordered
            >
              <Card.Title>Grant nomi</Card.Title>
              <Card.Content>Grant tavsifi...</Card.Content>
              <Card.Actions>
                <Button>Ko'rish</Button>
              </Card.Actions>
            </Card>
        </div>
    );
}
*/