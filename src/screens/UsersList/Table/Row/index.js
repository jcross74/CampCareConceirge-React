import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Balance from "../../../../components/Balance";

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
                            <img
                              src={item.avatar || "/images/content/Camp_Image.png"}
                              alt="Avatar"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.user}>{item.nameFirst} {item.nameLast}</div>
                            <div className={styles.login}>{item.userRole}</div>
                            
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.email}>{item.email}</div>
                </div>
                
                <div className={styles.col}>
                <div className={styles.label}>
                  {item.memberSince && item.memberSince.toDate
                    ? item.memberSince.toDate().toLocaleDateString()
                    : ""}
                </div>
                    
                </div>
                
            </div>
        </>
    );
};

export default Row;
