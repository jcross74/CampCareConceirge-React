import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Balance from "../../../../components/Balance";

const formatPhoneNumber = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

const Row = ({
    item,
    value,
    onChange,
    activeTable,
    setActiveTable,
    activeId,
    setActiveId,
}) => {
    const handleClick = (id) => {
        setActiveTable(true);
        setActiveId(id);
    };

    return (
        <>
            <div
                className={cn(
                    styles.row,
                    { [styles.selected]: activeId === item.id },
                    { [styles.active]: activeTable }
                )}
            >
                <div className={styles.col}>
                    <Checkbox
                        className={styles.checkbox}
                        value={value}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.col}>
                    <div
                        className={styles.item}
                        
                    >
                        <div className={styles.avatar}>
                            <img src={item.avatar || "../../images/content/Camp_Image.png"} alt="Avatar" />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.user}>{item.providerName}</div>
                            <div className={styles.login}>{item.login}</div>
                            <div className={styles.email}>{item.email}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.email}>{formatPhoneNumber(item.providerPhone)}</div>
                </div>
                <div className={styles.col}>
                    <div className={styles.email}>
                        {item.providerEmail}
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.lifetime}>
                        <div className={styles.label}>{item.providerCity}</div>
                        
                    </div>
                </div>
                <div className={styles.col}>{item.providerState}</div>
                <div className={styles.col}>{item.providerStatus}</div>
            </div>
        </>
    );
};

export default Row;
