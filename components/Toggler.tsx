interface TogglerProps {
  current: string;
  options: string[];
  onChange: (option: string) => void;
}

const Toggler = (props: TogglerProps) => {
  return (
    <div className='flex'>
      {props.options.map((text) => {
        return (
          <TogglerButton
            key={text}
            text={text}
            active={text === props.current}
            onClick={() => props.onChange(text)}
          />
        );
      })}
    </div>
  );
};

interface TogglerButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const TogglerButton = (props: TogglerButtonProps) => {
  const className = `border px-2 py-1 mx-1 cursor-pointer ${
    props.active ? 'bg-indigo-500 text-white border-indigo-500' : ''
  }`;
  return (
    <div className={className} onClick={props.onClick}>
      {props.text}
    </div>
  );
};

export { Toggler };
