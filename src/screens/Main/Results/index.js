// src/screens/Main/Results/index.js

import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import MainNavigationDark from '../../../components/MainNavigationDark';
import Footer from '../../../components/Footer';
import Card from '../../../components/Card';
import TextInput from '../../../components/TextInput';
import Dropdown from '../../../components/Dropdown';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';
import styles from './Results.module.sass';

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialResults = state?.results || [];
  const searchTerm = state?.searchTerm || '';

  const [keyword, setKeyword] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [campType, setCampType] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [cost, setCost] = useState('');
  const [filteredResults, setFilteredResults] = useState(initialResults);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const autoFiltered = initialResults.filter(item => {
      const name = (item.campName || '').toLowerCase();
      const city = (item.campCity || '').toLowerCase();
      const desc = (item.campDescription || '').toLowerCase();
      const tags = (item.campTags || []).map(tag => tag.toLowerCase());
      return (
        name.includes(term) ||
        city.includes(term) ||
        desc.includes(term) ||
        tags.some(tag => tag.includes(term))
      );
    });
    setFilteredResults(autoFiltered);
  }, [initialResults, searchTerm]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleFilter = (e) => {
    e.preventDefault();
    const filtered = initialResults.filter(item => {
      // Keyword filter
      if (keyword.trim()) {
        const term = keyword.toLowerCase();
        const haystack = JSON.stringify(item).toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      // Location filter
      if (locationFilter && locationFilter !== 'Locations') {
        if (!item.campCity || item.campCity.toLowerCase() !== locationFilter.toLowerCase()) {
          return false;
        }
      }
      // Camp Type filter
      if (campType && campType !== 'Camp Type') {
        const tags = item.campTags || [];
        if (!tags.map(t => t.toLowerCase()).includes(campType.toLowerCase())) return false;
      }
      // Age Range filter
      if (ageRange && ageRange !== 'Age Range') {
        const [min, max] = ageRange.includes('+')
          ? [parseInt(ageRange, 10), Infinity]
          : ageRange.split('-').map(x => parseInt(x, 10));
        const campMin = item.campAgeMin || 0;
        const campMax = item.campAgeMax || 0;
        if (campMax < min || campMin > max) return false;
      }
      // Cost filter
      if (cost && cost !== 'Cost') {
        const price = Number(item.campCost) || 0;
        if (cost === 'Free' && price !== 0) return false;
        if (cost === '$1-$100' && (price < 1 || price > 100)) return false;
        if (cost === '$101-$250' && (price < 101 || price > 250)) return false;
        if (cost === '$251+' && price < 251) return false;
      }
      return true;
    });
    setFilteredResults(filtered);
  };

  const handleClearFilters = () => {
    setKeyword('');
    setLocationFilter('');
    setCampType('');
    setAgeRange('');
    setCost('');
    setFilteredResults(initialResults);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredResults]);

  const pageCount = Math.ceil(filteredResults.length / itemsPerPage);
  const pagedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <MainNavigationDark />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.resultsPage}>
            <main className={styles.resultsContent}>
              <div className={styles.resultsHeader}>
                <span>{filteredResults.length} results for "{searchTerm}"</span>
                <button
                  type="button"
                  className={styles.filterButton}
                  onClick={() => setShowFilterModal(true)}
                >
                  <Icon name="faSliders" size={16} className={styles.filterIcon} />
                  <span>Filters</span>
                </button>
              </div>

              <Modal visible={showFilterModal} onClose={() => setShowFilterModal(false)}>
                <Card className={styles.card}>
                  <div className={styles.filterTitle}>Find Camps & Activities</div>
                  <form
                    className={styles.filters}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleFilter(e);
                      setShowFilterModal(false);
                    }}
                  >
                    <TextInput
                      type="text"
                      placeholder="Keywords"
                      value={keyword}
                      onChange={e => setKeyword(e.target.value)}
                    />
                    <Dropdown
                      className={cn(styles.field, styles.dropdownMargin)}
                      placeholder="Locations"
                      value={locationFilter || 'Locations'}
                      setValue={setLocationFilter}
                      options={[
                        "Alexandria","Annandale","Burke","Centreville","Chantilly",
                        "Clifton","Dunn Loring","Fairfax","Fairfax Station","Falls Church",
                        "Fort Belvoir","Great Falls","Herndon","Lorton","McLean",
                        "Oakton","Reston","Springfield","Vienna","Virtual","West McLean"
                      ]}
                    />
                    <Dropdown
                      className={cn(styles.field, styles.dropdownMargin)}
                      placeholder="Camp Type"
                      value={campType || 'Camp Type'}
                      setValue={setCampType}
                      options={["Day Camp","Art Camp","STEM Camp","Sports Camp"]}
                    />
                    <Dropdown
                      className={styles.dropdown}
                      placeholder="Age Range"
                      value={ageRange || 'Age Range'}
                      setValue={setAgeRange}
                      options={["3-5","6-8","9-11","12+"]}
                    />
                    <Dropdown
                      className={styles.dropdown}
                      placeholder="Cost"
                      value={cost || 'Cost'}
                      setValue={setCost}
                      options={["Free","$1-$100","$101-$250","$251+"]}
                    />
                    <button type="submit" className={styles.submitButton}>
                      Filter
                    </button>
                    <button
                      type="button"
                      className={styles.clearButton}
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </button>
                  </form>
                </Card>
              </Modal>

              <div className={styles.campGrid}>
                {pagedResults.length === 0 ? (
                  <div className={styles.noResults}>
                    No results found. Please try another search.
                  </div>
                ) : (
                  pagedResults.map((item, idx) => (
                    <div
                      key={idx}
                      className={styles.campCard}
                      onClick={() => navigate('/details', { state: { ...item } })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter')
                          navigate('/details', { state: { ...item } });
                      }}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          src={
                            Array.isArray(item.campImages) && item.campImages.length > 0
                              ? item.campImages[0]
                              : 'https://firebasestorage.googleapis.com/v0/b/campcare-react.firebasestorage.app/o/campImages%2FCamp_Image.png?alt=media&token=aec0e683-4681-4fba-95e5-145951685a60'
                          }
                          alt={item.campName}
                        />
                        <span className={styles.price}>
                          {Number(item.campCost) === 0 ? 'Free' : `$${item.campCost}`}
                        </span>
                      </div>
                      <div className={styles.content}>
                        <div className={styles.topRow}>
                          <div className={styles.heading}>{item.campName}</div>
                        </div>
                        <div className={styles.meta}>
                          <span>
                            {item.campCity}, {item.campState} {item.campZip}
                          </span>
                          <span>
                            {(
                              item.campStart.toDate
                                ? item.campStart.toDate()
                                : item.campStart.seconds
                                ? new Date(item.campStart.seconds * 1000)
                                : new Date(item.campStart)
                            ).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                            {' – '}
                            {(
                              item.campEnd.toDate
                                ? item.campEnd.toDate()
                                : item.campEnd.seconds
                                ? new Date(item.campEnd.seconds * 1000)
                                : new Date(item.campEnd)
                            ).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className={styles.pagination}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount))}
                  disabled={currentPage === pageCount}
                >
                  Next
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Results;